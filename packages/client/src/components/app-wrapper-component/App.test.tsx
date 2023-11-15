import React from 'react'
import App from './App'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../store' // убедитесь, что путь до вашего хранилища верный

const appContent = 'Home Page'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test.skip('Example test', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  expect(screen.getByText(appContent)).toBeDefined()
})
