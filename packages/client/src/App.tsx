import { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function NotFoundPage() {
  return <h1>404 - Page Not Found</h1>
}

function LoginPage() {
  return <h1>Login Page</h1>
}

function RegisterPage() {
  return <h1>Register Page</h1>
}

function HomePage() {
  return <h1>Home Page</h1>
}

function ProfilePage() {
  return <h1>Profile Page</h1>
}

function GamePage() {
  return <h1>Game Page</h1>
}

function LeaderboardPage() {
  return <h1>Leaderboard Page</h1>
}

function ForumPage() {
  return <h1>Forum Page</h1>
}

function ForumTopicPage() {
  return <h1>ForumTopic Page</h1>
}

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/forum/:topicId" element={<ForumTopicPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App
