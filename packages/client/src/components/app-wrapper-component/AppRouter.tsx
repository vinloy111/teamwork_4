import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom'
import { HomePage } from '../../pages/home'
import { GamePage } from '../../pages/game'
import ForumPage from '../../pages/forum/ForumPage'
import Layout from '../layout/Layout'
import NotFoundPage from '../../pages/404/404'
import ServerErrorPage from '../../pages/500/ServerErrorPage'
import LeaderBoardPage from '../../pages/leaderboard/LeaderBoardPage'
import LoginPage from '../../pages/login/LoginPage'
import RegisterPage from '../../pages/register/RegisterPage'
import { ForumTopicPage } from '../../pages/topic/ForumTopicPage'
import { useSelector } from 'react-redux'
import { Store } from '../../store'
import React from 'react'

function ProfilePage() {
  return <h1>Profile Page</h1>
}

export const AppRouter = () => {
  const user = useSelector((state: Store) => {
    return state.auth.user
  })

  const protectedRoute = (PageComponent: React.ComponentType) =>
    user ? <PageComponent /> : <Navigate to="/login" />

  return createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/500" element={<ServerErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* Приватные страницы */}
        <Route path="/" element={protectedRoute(HomePage)} />
        <Route path="/profile" element={protectedRoute(ProfilePage)} />
        <Route path="/game" element={protectedRoute(GamePage)} />
        <Route path="/leaderboard" element={protectedRoute(LeaderBoardPage)} />
        <Route path="/forum" element={protectedRoute(ForumPage)} />
        <Route
          path="/forum/:topicId"
          element={protectedRoute(ForumTopicPage)}
        />
      </Route>
    )
  )
}
