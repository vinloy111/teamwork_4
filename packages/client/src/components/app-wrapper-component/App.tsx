import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material'
import { themeOptions } from '../../theme'
import { RouterProvider } from 'react-router'
import { AppRouter } from './AppRouter'
import './App.css'
import useAuthCheck from '../../hooks/useAuthCheck'
import useNotifications from 'hooks/useNotifications'

function App() {
  const router = AppRouter()
  const [isAuthChecked, setIsAuthChecked] = useState(false)

  useAuthCheck(() => setIsAuthChecked(true))
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const { permitted, sendNotification } = useNotifications()

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
        ...themeOptions,
      }),
    [prefersDarkMode]
  )

  useEffect(() => {
    sendNotification({
      text: 'Давай захватим вселенную!',
      title: 'Привет из игры!',
      iconUrl: '/avatars/ufo1.png',
    })
  }, [permitted])
  return (
    <ThemeProvider theme={theme}>
      {isAuthChecked ? (
        <RouterProvider router={router} />
      ) : (
        <div>Авторизация...</div>
      )}
    </ThemeProvider>
  )
}

export default App
