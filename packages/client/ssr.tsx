import { StaticRouter } from 'react-router-dom/server'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore } from './src/store'
import App from './src/components/app-wrapper-component/App'
import { setUser } from './src/features/authSlice'
import { adaptUserData } from './src/utils/adaptUserData'
import yApiService from './src/services/y-api-service'
import { useState } from 'react'
import useAuthCheck from './src/hooks/useAuthCheck'
import { mockUser1 } from './src/mocks/users'

export async function render(uri, cookie) {
  const store = createStore()

  if (cookie) {
    try {
      // Получаем параметры из URL
      const urlParams = new URLSearchParams(uri)
      const code = uri.split('=')[1]
      console.log('----------------------------------------', uri, code, cookie)
      if (code) {
        const response = await yApiService.oauthLogin(code)
        console.log(
          'response-----------------------------------------------------',
          response.data
        )
        //store.dispatch(setUser(adaptUserData(response.data)))
        if (response.data === 'OK') {
          //const user = await yApiService.getUser(response.headers["set-cookie"].join(';'))
          store.dispatch(setUser(mockUser1))
        }
      } else {
        const response = await yApiService.getUser(cookie)
        store.dispatch(setUser(adaptUserData(response.data)))
      }
    } catch (e) {
      console.log(e.message)
    }
  }
  const initialState = store.getState()
  const renderResult = renderToString(
    <StaticRouter location={uri}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  )
  return [initialState, renderResult]
}
