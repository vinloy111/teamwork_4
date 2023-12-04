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
import { isAxiosError } from 'axios'
import yApiService from 'services/y-api-service'
import { registerFormToDto } from 'utils/registerFormToDto'
import { setUser } from 'features/authSlice'
import { adaptUserData } from 'utils/adaptUserData'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '../../store'

function RegisterPage() {
  const DEFAULT_ERROR_TEXT = 'Ошибка регистрации'
  const [registerData, setRegisterData] = useState({
    firstName: '',
    secondName: '',
    login: '',
    email: '',
    password: '',
    phone: '',
  })
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state: Store) => state.auth.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    })
  }

  const prepareError = (error: unknown) => {
    if (isAxiosError(error)) {
      console.error(`${DEFAULT_ERROR_TEXT}:`, error.response?.data?.reason)
      setError(error.response?.data?.reason || DEFAULT_ERROR_TEXT)
    }
  }

  const checkUserRegistration = async () => {
    try {
      const response = await yApiService.getUser()
      dispatch(setUser(adaptUserData(response.data)))
    } catch (error) {
      prepareError(error)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await yApiService.register(registerFormToDto(registerData))

      await checkUserRegistration()
    } catch (error) {
      prepareError(error)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className="register-form">
        <StyledHeader text="Регистрация" />
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="first_name"
            label="Имя"
            name="firstName"
            autoComplete="fname"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="second_name"
            label="Фамилия"
            name="secondName"
            autoComplete="lname"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Логин"
            name="login"
            autoComplete="login"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Электронная почта"
            name="email"
            autoComplete="email"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Телефон"
            name="phone"
            autoComplete="tel"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit">
            Зарегистрироваться
          </Button>
          <Typography
            variant="body2"
            style={{ marginTop: '20px', textAlign: 'center' }}>
            Уже есть аккаунт?
            <Link to="/login" style={{ marginLeft: '5px' }}>
              Войти
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

export default RegisterPage
