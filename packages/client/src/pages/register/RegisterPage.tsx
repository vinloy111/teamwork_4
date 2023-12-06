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
import { registerValidationSchema } from 'utils/userValidationSchema'
import { useFormik } from 'formik'

function RegisterPage() {
  const DEFAULT_ERROR_TEXT = 'Ошибка регистрации'
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state: Store) => state.auth.user)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      secondName: '',
      login: '',
      email: '',
      password: '',
      phone: '',
    },
    validationSchema: registerValidationSchema,
    onSubmit: async values => {
      try {
        await yApiService.register(registerFormToDto(values))
        await checkUserRegistration()
      } catch (error) {
        prepareError(error)
      }
    },
  })

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

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

  return (
    <Container component="main" maxWidth="xs">
      <div className="register-form">
        <StyledHeader text="Регистрация" />
        <form noValidate onSubmit={formik.handleSubmit}>
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
            onChange={formik.handleChange}
            value={formik.values.firstName}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && !!formik.errors.firstName}
            helperText={formik.touched.firstName && formik.errors.firstName}
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
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.secondName}
            error={formik.touched.secondName && !!formik.errors.secondName}
            helperText={formik.touched.secondName && formik.errors.secondName}
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
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.login}
            error={formik.touched.login && !!formik.errors.login}
            helperText={formik.touched.login && formik.errors.login}
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
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
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
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
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
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            error={formik.touched.phone && !!formik.errors.phone}
            helperText={formik.touched.phone && formik.errors.phone}
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
