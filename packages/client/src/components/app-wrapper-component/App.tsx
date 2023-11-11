import { useEffect, useMemo } from 'react'
import axios from 'axios'
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material'
import { theme, themeOptions } from '../../theme'
import { RouterProvider } from 'react-router'
import { AppRouter } from './AppRouter'
import './App.css'

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
        },
        ...themeOptions,
      }),
    []
  )

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      try {
        const response = await axios.get(url)
        console.log(response.data)
      } catch (error) {
        console.error('Ошибка при запросе данных:', error)
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
