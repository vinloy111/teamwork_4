import { useEffect, useMemo } from 'react'
import axios from 'axios'
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material'
import { themeOptions } from '../../theme'
import { RouterProvider } from 'react-router'
import { AppRouter } from './AppRouter'
import './App.css'
import { useErrorHandling } from '../../components/errors/ErrorBoundary'

function App() {
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

  const triggerError = useErrorHandling()

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      try {
        const response = await axios.get(url)
        console.log(response.data)
      } catch (error) {
        console.error('Ошибка при запросе данных:', error)

        // TODO: Вывести сообщение об ошибке можно так
        /*
        if (error instanceof Error) {
          triggerError(error);
        }
        */
      }
    }

    fetchServerData()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={AppRouter} />
    </ThemeProvider>
  )
}

export default App
