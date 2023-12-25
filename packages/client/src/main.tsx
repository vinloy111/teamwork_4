import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import App from './components/app-wrapper-component/App'
import { AppWindow } from 'types/Window'

// packages\client\src\main.tsx

const stateFromServer = JSON.parse((window as AppWindow).__PRELOADED_STATE__)
const state = { ...store.getState(), ...stateFromServer }

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <BrowserRouter>
    <Provider store={state}>
      <App />
    </Provider>
  </BrowserRouter>
)
