import App from './src/components/app-wrapper-component/App'
import { renderToString } from 'react-dom/server'
import { store } from './src/store'
import { Provider } from 'react-redux'

export function render() {
  return renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )
}
