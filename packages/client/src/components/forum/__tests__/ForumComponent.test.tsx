import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ForumComponent } from 'components/forum/ForumComponent'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { mockForum } from 'mocks/forum'
import { Provider } from 'react-redux'
import { mockUser1 } from 'mocks/users'
import { createStore } from '../../../store'

const LayoutForTests = (component: React.ReactNode, route?: string) => {
  return (
    <MemoryRouter initialEntries={[route || '/']}>{component}</MemoryRouter>
  )
}

describe('ForumComponent', () => {
  /*  const mockedNavigator = jest.fn();
  jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedNavigator,
  }));*/
  test('Render with topics', async () => {
    render(
      LayoutForTests(
        <Provider store={createStore({ user: mockUser1 })}>
          <ForumComponent />
        </Provider>,
        '/forum'
      )
    )
    //expect(screen.getByText(mockForum.caption)).toBeDefined()
    expect(screen.getByText('Создать тему')).toBeDefined()
    expect(screen.getAllByRole('button')).toHaveLength(1)
  })
  test('Click on button navigate to topic', async () => {
    render(
      LayoutForTests(
        <Provider store={createStore({ user: mockUser1 })}>
          <ForumComponent />
        </Provider>,
        '/forum'
      )
    )
    const btn = screen.getAllByText('Создать тему')[0]
    expect(btn).toBeDefined()
    await userEvent.click(btn)
    //expect(mockedNavigator).toBeCalled()
  })
  test('Render without topics', async () => {
    mockForum.listOfTopics = []
    render(
      LayoutForTests(
        <Provider store={createStore({ user: mockUser1 })}>
          <ForumComponent />
        </Provider>,
        '/forum'
      )
    )
    expect(screen.getByRole('button')).toBeDefined()
  })
})
