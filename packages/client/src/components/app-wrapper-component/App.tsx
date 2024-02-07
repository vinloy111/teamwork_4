import { useEffect, useMemo, useState } from 'react'
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorComponent } from 'components/error/error'
import useNotifications from 'hooks/useNotifications'
import useAuthCheck from 'hooks/useAuthCheck'
import { APP_CONSTS } from 'consts/index'
import { darkThemeOptions, lightThemeOptions } from '../../theme'
import { AppRouter } from './AppRouter'
import { LoaderComponent } from 'components/loader/LoaderComponent'
import { useSelector } from 'react-redux'
import { Store } from '../../store'

function App() {
  const userTheme = useSelector((state: Store) => state.theme.userTheme)
  const allThemes = useSelector((state: Store) => state.theme.allThemes)
  const user = useSelector((state: Store) => state.user)
  const [isAuthChecked, setIsAuthChecked] = useState(user !== null)

  useAuthCheck(() => setIsAuthChecked(true))
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const { permitted, sendNotification } = useNotifications()

  const theme = useMemo(() => {
    const currentTheme =
      (allThemes?.find(({ id }) => userTheme?.themeId === id)
        ?.theme as PaletteMode) || (prefersDarkMode ? 'dark' : 'light')

    const themeOptions =
      currentTheme !== 'light' ? darkThemeOptions : lightThemeOptions

    return createTheme({
      palette: {
        mode: currentTheme,
      },
      ...themeOptions,
    })
  }, [prefersDarkMode, userTheme, allThemes])

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
          {isAuthChecked ? <AppRouter /> : <LoaderComponent />}
        </>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
