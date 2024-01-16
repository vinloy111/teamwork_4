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
