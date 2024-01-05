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
import { useFormik } from 'formik'
import { loginValidationSchema } from 'utils/userValidationSchema'
import YandexLogo from '../../assets/images/yandex-logo.png'

function LoginPage() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state: Store) => state.auth.user)
  const DEFAULT_ERROR_TEXT = 'Ошибка авторизации'

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async values => {
      try {
        await yApiService.login(values)
        await checkUserAuthentication()
      } catch (error) {
        prepareError(error)
      }
    },
  })

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

  const handleOAuthLogin = async () => {
    try {
      const CLIENT_ID = await yApiService
        .getServiceId()
        .then(({ data }) => data.service_id)
      const REDIRECT_URI = encodeURIComponent(window.location.origin)
      window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
    } catch (e) {
      setError('Не удалось получить id приложения')
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className="login-form">
        <StyledHeader text="Авторизация" />
        <form noValidate onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="login"
            label="Логин"
            name="login"
            autoComplete="login"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.login}
            error={formik.touched.login && !!formik.errors.login}
            helperText={formik.touched.login && formik.errors.login}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit">
            Войти
          </Button>

          <section className="alternative-logins">
            Войти с помощью:
            <Button
              onClick={handleOAuthLogin}
              variant="contained"
              color="secondary"
              type="button"
              className="yandex-login-button">
              <img src={YandexLogo} alt="Войти через Яндекс" />
            </Button>
          </section>
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
