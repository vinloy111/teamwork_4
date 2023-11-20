import { useEffect, useMemo } from 'react'
import axios from 'axios'
import {
  Box,
  createTheme,
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
} from '@mui/material'
import { themeOptions } from '../../theme'
import { RouterProvider } from 'react-router'
import { AppRouter } from './AppRouter'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from '../../features/authSlice'

// TODO: не забыть удалить после загрузки данных с сервера
import { mockapUser } from '../../mocks/user'

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const dispatch = useDispatch()

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

  useEffect(() => {
    const userId = '123'
    const token = 'qwe'

    const getUser = async () => {
      const response = await fetch(`http://localhost:3001/user/${userId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      })
      const date = await response.json()
      dispatch(
        setLogin({
          user: date.user,
          token: date.token,
        })
      )
    }

    // TODO: Mockap данные пользователя
    //getUser();
    dispatch(
      setLogin({
        user: mockapUser[0],
        token: 'qwertyuiop',
      })
    )
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={AppRouter} />
    </ThemeProvider>
  )
}

export default App
