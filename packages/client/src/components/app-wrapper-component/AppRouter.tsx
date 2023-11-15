import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import HomePage from '../../pages/HomePage'
import { GamePage } from '../../pages/game'
import ForumPage from '../../pages/forum/ForumPage'
import { ErrorElement } from '../errors/ErrorBoundary'

function NotFoundPage() {
  return <h1>404 - Page Not Found</h1>
}

function LoginPage() {
  return <h1>Login Page</h1>
}

function RegisterPage() {
  return <h1>Register Page</h1>
}

function ProfilePage() {
  return <h1>Profile Page</h1>
}

function LeaderboardPage() {
  return <h1>Leaderboard Page</h1>
}

function ForumTopicPage() {
  return <h1>ForumTopic Page</h1>
}
//errorElement={<ErrorElement fallback={<h1>Error...</h1>}/>}
export const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} errorElement={<ErrorElement />} />
      <Route
        path="/login"
        element={<LoginPage />}
        errorElement={<ErrorElement />}
      />
      <Route
        path="/register"
        element={<RegisterPage />}
        errorElement={<ErrorElement />}
      />
      <Route
        path="/profile"
        element={<ProfilePage />}
        errorElement={<ErrorElement />}
      />
      <Route
        path="/game"
        element={<GamePage />}
        errorElement={<ErrorElement />}
      />
      <Route
        path="/leaderboard"
        element={<LeaderboardPage />}
        errorElement={<ErrorElement />}
      />
      <Route
        path="/forum"
        element={<ForumPage />}
        errorElement={<ErrorElement />}
      />
      <Route
        path="/forum/:topicId"
        element={<ForumTopicPage />}
        errorElement={<ErrorElement />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
)
