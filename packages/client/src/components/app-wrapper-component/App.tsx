import { useEffect, useMemo } from 'react'
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material'
import { ErrorBoundary } from 'react-error-boundary'
import { useSelector } from 'react-redux'
import { Store } from 'src/store'
import { ErrorComponent } from 'components/error/error'
import useNotifications from 'hooks/useNotifications'
import useAuthCheck from 'hooks/useAuthCheck'
import { APP_CONSTS } from 'consts/index'
import { themeOptions } from '../../theme'
import { AppRouter } from './AppRouter'

function App() {
  useAuthCheck()
  const user = useSelector((state: Store) => state.auth.user)
  const { sendNotification, permitted } = useNotifications()
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

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
    if (permitted && !user?.id) {
      sendNotification({
        title: 'Вы не авторизованы',
        text: 'Для сохранения ваших рекордов и общения на форуме необходимо авторизоваться или зарегистрироваться',
        iconUrl: '/avatars/ufo1.png',
      })
    }
  }, [permitted])

  return (
    <ErrorBoundary fallback={<ErrorComponent type="500" />}>
      <ThemeProvider theme={theme}>
        <>
          <CssBaseline />
          <AppRouter />
        </>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
