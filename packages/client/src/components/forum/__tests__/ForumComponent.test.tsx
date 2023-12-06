import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ForumComponent } from 'components/forum/ForumComponent'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { mockForum } from 'mocks/forum'

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
    render(LayoutForTests(<ForumComponent />, '/forum'))
    expect(screen.getByText(mockForum.caption)).toBeDefined()
    expect(screen.getByText('Создать тему')).toBeDefined()
    expect(screen.getAllByText('Открыть')).toHaveLength(3)
    mockForum.listOfTopics?.map(topic => {
      expect(screen.getByText(topic.caption)).toBeDefined()
    })
  })
  test('Click on button navigate to topic', async () => {
    render(LayoutForTests(<ForumComponent />, '/forum'))
    const btn = screen.getAllByText('Создать тему')[0]
    expect(btn).toBeDefined()
    await userEvent.click(btn)
    //expect(mockedNavigator).toBeCalled()
  })
  test('Render without topics', async () => {
    mockForum.listOfTopics = []
    render(LayoutForTests(<ForumComponent />))
    expect(screen.getByText(mockForum.caption)).toBeDefined()
    expect(screen.getByRole('button')).toBeDefined()
  })
})
