import {
  createBrowserRouter,
  createMemoryRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom'
import { HomePage } from 'pages/home'
import { GamePage } from 'pages/game'
import ForumPage from 'pages/forum/ForumPage'
import Layout from '../layout/Layout'
import NotFoundPage from 'pages/404/404'
import ServerErrorPage from 'pages/500/ServerErrorPage'
import LeaderBoardPage from 'pages/leaderboard/LeaderBoardPage'
import LoginPage from 'pages/login/LoginPage'
import RegisterPage from 'pages/register/RegisterPage'
import { ForumTopicPage } from 'pages/topic/ForumTopicPage'
import { useSelector } from 'react-redux'
import { Store } from '../../store'
import React from 'react'
import SettingsPage from 'pages/settings/SettingsPage'
import ChangePasswordPage from 'pages/change-password/ChangePasswordPage'
import UserProfilePage from 'pages/user-profile/UserProfilePage'
import ChangeAvatarPage from 'pages/change-avatar/ChangeAvatarPage'
import { ForumAddTopicPage } from 'pages/add-topic/ForumAddTopicPage'
import { ErrorComponent } from 'components/error/error'

export const AppRouter = (isServer = false) => {
  const user = useSelector((state: Store) => {
    return state.auth.user
  })

  const protectedRoute = (PageComponent: React.ComponentType) =>
    user ? <PageComponent /> : <Navigate to="/login" />

  const elements = createRoutesFromElements(
    <Route
      element={<Layout />}
      errorElement={
        <Layout>
          <ErrorComponent type="500" />
        </Layout>
      }>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/500" element={<ServerErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />

      {/* Приватные страницы */}
      <Route path="/" element={protectedRoute(HomePage)} />
      <Route path="/users/:userId" element={protectedRoute(UserProfilePage)} />
      <Route path="/game" element={protectedRoute(GamePage)} />
      <Route path="/leaderboard" element={protectedRoute(LeaderBoardPage)} />
      <Route path="/forum" element={protectedRoute(ForumPage)} />
      <Route path="/forum/:topicId" element={protectedRoute(ForumTopicPage)} />
      <Route
        path="/forum/add-topic"
        element={protectedRoute(ForumAddTopicPage)}
      />
      <Route path="/settings" element={protectedRoute(SettingsPage)} />
      <Route
        path="/change-password"
        element={protectedRoute(ChangePasswordPage)}
      />
      <Route path="/change-avatar" element={protectedRoute(ChangeAvatarPage)} />
    </Route>
  )

  return isServer ? createMemoryRouter(elements) : createBrowserRouter(elements)
}
