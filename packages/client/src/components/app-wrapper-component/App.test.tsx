import React from 'react'
import App from './App'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from '../../store' // убедитесь, что путь до вашего хранилища верный

const appContent = 'Home Page'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

describe('my suite', () => {
  test.skip('Example test', async () => {
    /*    render(
      <Provider store={createStore()}>
        <App />
      </Provider>
    )
    expect(screen.getByText(appContent)).toBeDefined()*/
  })
})
