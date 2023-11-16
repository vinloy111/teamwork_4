import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { HomePage } from '../../pages/home'
import { GamePage } from '../../pages/game'
import ForumPage from '../../pages/forum/ForumPage'
import Layout from '../layout/Layout'
import NotFoundPage from '../../pages/404/404'
import ServerErrorPage from '../../pages/500/ServerErrorPage'
import LeaderBoardPage from '../../pages/leaderboard/LeaderBoardPage'

function LoginPage() {
  return <h1>Login Page</h1>
}

function RegisterPage() {
  return <h1>Register Page</h1>
}

function ProfilePage() {
  return <h1>Profile Page</h1>
}

function ForumTopicPage() {
  return <h1>ForumTopic Page</h1>
}

export const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/leaderboard" element={<LeaderBoardPage />} />
      <Route path="/forum" element={<ForumPage />} />
      <Route path="/forum/:topicId" element={<ForumTopicPage />} />
      <Route path="/500" element={<ServerErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
)
