import { useEffect, useMemo, useState } from 'react'
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorComponent } from 'components/error/error'
import useNotifications from 'hooks/useNotifications'
import useAuthCheck from 'hooks/useAuthCheck'
import { APP_CONSTS } from 'consts/index'
import { themeOptions } from '../../theme'
import { RouterProvider } from 'react-router'
import { AppRouter } from './AppRouter'
import './App.css'
import { LoaderComponent } from 'components/loader/LoaderComponent'

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
    document.title = APP_CONSTS.gameName
  }, [])

  useEffect(() => {
    sendNotification({
      text: 'Давай захватим вселенную!',
      title: 'Привет из игры!',
      iconUrl: '/avatars/ufo1.png',
    })
  }, [permitted])

  return (
    <ErrorBoundary fallback={<ErrorComponent type="500" />}>
      <ThemeProvider theme={theme}>
        <>
          <CssBaseline />
          {isAuthChecked ? (
            <RouterProvider router={router} />
          ) : (
            <LoaderComponent />
          )}
        </>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
