import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppWindow } from 'types/Window'
import { createStore } from './store'
import App from './components/app-wrapper-component/App'

const initialState = (window as AppWindow).__PRELOADED_STATE__

delete (window as AppWindow).__PRELOADED_STATE__

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <BrowserRouter>
    <Provider store={createStore(initialState)}>
      <App />
    </Provider>
  </BrowserRouter>
)
