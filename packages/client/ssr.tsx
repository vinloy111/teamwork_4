import { StaticRouter } from 'react-router-dom/server'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore } from './src/store'
import App from './src/components/app-wrapper-component/App'
import { setUser } from './src/features/authSlice'
import { adaptUserData } from './src/utils/adaptUserData'
import yApiService from './src/services/y-api-service'

export async function render(uri, cookie) {
  const store = createStore()
  if (cookie) {
    const response = await yApiService.getUser(cookie)
    store.dispatch(setUser(adaptUserData(response.data)))
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
