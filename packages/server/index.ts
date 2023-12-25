import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import { store } from './node_modules/client/src/store'
import type { ViteDevServer } from 'vite'

dotenv.config()

import express from 'express'
import * as fs from 'fs'
import * as path from 'path'

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

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

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
    app.use('/avatars', express.static(path.resolve(distPath, 'avatars')))
    app.use('/images', express.static(path.resolve(distPath, 'images')))
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
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')

        template = await vite!.transformIndexHtml(url, template)
      }

      let render: (url: string, store: any) => Promise<string>

      if (!isDev()) {
        render = (await import(ssrClientPath)).render
      } else {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render
      }

      // packages\server\index.ts

      // 1. Откуда импортировать store
      // ?? import { store } from './node_modules/client/src/store'
      // Если дулаю так, то все заканчивается ошибкой и кмк это не верно
      // 2. Откуда импортировать dispatch для сохранения запроса в store
      // 3. Как сделать запрос к северу?
      const preloadedState = store.getState()
      const preloadedStateScript = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
        preloadedState
      ).replace(/</g, '\u003c')}</script>`

      const appHtml = await render(url, store)

      const html = template.replace(
        `<!--ssr-outlet-->`,
        appHtml + preloadedStateScript
      )

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
}

startServer()
