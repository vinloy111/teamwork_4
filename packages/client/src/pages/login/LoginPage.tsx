import React, { useEffect, useState } from 'react'
import {
  Button,
  TextField,
  Container,
  Typography,
  Snackbar,
} from '@mui/material'
import StyledHeader from '../../components/styled-header/StyledHeader'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import yApiService from '../../services/y-api-service'
import { isAxiosError } from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../features/authSlice'
import { adaptUserData } from '../../utils/adaptUserData'
import { Store } from '../../store'

function LoginPage() {
  const [loginData, setLoginData] = useState({ login: '', password: '' })
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state: Store) => state.auth.user)
  const DEFAULT_ERROR_TEXT = 'Ошибка авторизации'

  useEffect(() => {
    if (user) {
      // Если user заполнился, перенаправляем на главную страницу
      navigate('/')
    }
  }, [user, navigate])

  const prepareError = (error: unknown) => {
    if (isAxiosError(error)) {
      console.error(`${DEFAULT_ERROR_TEXT}:`, error.response?.data?.reason)
      setError(error.response?.data?.reason || DEFAULT_ERROR_TEXT)
    }
  }

  const checkUserAuthentication = async () => {
    try {
      const response = await yApiService.getUser()
      dispatch(setUser(adaptUserData(response.data)))
    } catch (error) {
      prepareError(error)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await yApiService.login(loginData)
      await checkUserAuthentication()
    } catch (error) {
      prepareError(error)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className="login-form">
        <StyledHeader text="Авторизация" />
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="login"
            label="Логин"
            name="login"
            autoComplete="login"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit">
            Войти
          </Button>
          <Typography
            variant="body2"
            style={{ marginTop: '20px', textAlign: 'center' }}>
            Нет аккаунта?
            <Link to="/register" style={{ marginLeft: '5px' }}>
              Зарегистрироваться
            </Link>
          </Typography>
        </form>
      </div>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        message={error}
      />
    </Container>
  )
}

export default LoginPage
