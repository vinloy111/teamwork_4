import React from 'react'
import App from './src/components/app-wrapper-component/App'
import { StaticRouter } from 'react-router-dom/server'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'

// packages\client\ssr.tsx

export function render(path: string, store: ToolkitStore) {
  return renderToString(
    <StaticRouter location={path}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  )
}
