import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import { createProxyMiddleware } from 'http-proxy-middleware'
import type { ViteDevServer } from 'vite'

dotenv.config()

import express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import themeRoutes from './routes/themeRoutes'
import reactionRoutes from './routes/reactionRoutes'
import { dbConnect, SiteTheme } from './init'
import forumRoutes from './routes/forumRoutes'

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
  dbConnect().then(async () => {
    const app = express()
    app.use(express.json())
    app.use(cors())

    if (!isDev()) {
      app.use(function (_, res, next) {
        res.setHeader(
          'Content-Security-Policy',
          "default-src 'self' https://ya-praktikum.tech; font-src 'self'; img-src 'self' https://ya-praktikum.tech; script-src 'self' 'nonce-2726c7f26c'; style-src 'self' 'unsafe-inline'; style-src-elem 'self' 'unsafe-inline'; frame-src 'self'"
        )
        next()
      })
    }

    // TODO костыль, исправить после добавления миграций
    const existingThemes = await SiteTheme.count()
    if (existingThemes === 0) {
      await SiteTheme.bulkCreate([
        { theme: 'dark', description: 'Темная тема' },
        { theme: 'light', description: 'Светлая тема' },
      ])
    }

    const port = Number(process.env.SERVER_PORT) || 3000

    let vite: ViteDevServer | undefined
    // Добавил проверки на isDev, так как если запускаешь dev и нет папок с билдами, то все падает
    const distPath = !isDev()
      ? path.dirname(require.resolve('client/dist/index.html'))
      : ''
    const srcPath = path.dirname(require.resolve('client'))
    const ssrClientPath = !isDev()
      ? require.resolve('client/dist-ssr/client.cjs')
      : ''

    if (isDev()) {
      vite = await createViteServer({
        server: { middlewareMode: true },
        root: srcPath,
        appType: 'custom',
      })

      app.use(vite.middlewares)
    }

    app.use('/api/theme', themeRoutes)
    app.use('/api/reaction', reactionRoutes)
    app.use('/api/forum', forumRoutes)

    app.get('/api', (_, res) => {
      res.json('👋 Howdy from the server :)')
    })

    app.use(
      '/api/v2',
      createProxyMiddleware({
        changeOrigin: true,
        cookieDomainRewrite: {
          '*': '',
        },
        target: 'https://ya-praktikum.tech',
      })
    )

    if (!isDev()) {
      app.use('/assets', express.static(path.resolve(distPath, 'assets')))
      app.use('/avatars', express.static(path.resolve(distPath, 'avatars')))
      app.use('/images', express.static(path.resolve(distPath, 'images')))
      app.use('/music', express.static(path.resolve(distPath, 'music')))
      app.use('/sounds', express.static(path.resolve(distPath, 'sounds')))
    }

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl

      try {
        let template: string

        if (!isDev()) {
          template = fs.readFileSync(
            path.resolve(distPath, 'index.html'),
            'utf-8'
          )
        } else {
          template = fs.readFileSync(
            path.resolve(srcPath, 'index.html'),
            'utf-8'
          )

          template = await vite!.transformIndexHtml(url, template)
        }

        let render: (url: string, cookie?: string) => Promise<string>

        if (!isDev()) {
          render = (await import(ssrClientPath)).render
        } else {
          render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
            .render
        }

        const [initialState, appHtml] = await render(url, req.headers['cookie'])

        const initStateSerialized = JSON.stringify(initialState).replace(
          /</g,
          '\\u003c'
        )

        // Сериализация переменных окружения для передачи их на клиентский фронт
        const envVarsSerialized = JSON.stringify({
          serverBaseUrl: process.env.SERVER_BASE_URL || 'http://localhost:3000',
        }).replace(/</g, '\\u003c')

        const html = template
          .replace(`<!--ssr-outlet-->`, appHtml)
          .replace('<!--store-data-->', initStateSerialized)
          .replace('<!--env-data-->', envVarsSerialized)

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      } catch (e) {
        if (isDev()) {
          vite!.ssrFixStacktrace(e as Error)
        }
        next(e)
      }
    })

    app.listen(port, () => {
      console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
    })
  })
}

startServer()
