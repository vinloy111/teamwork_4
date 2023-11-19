import React from 'react'
import { Button, TextField, Container, Typography } from '@mui/material'
import StyledHeader from '../../components/styled-header/StyledHeader'
import { Link } from 'react-router-dom'
import './style.css'

function RegisterPage() {
  return (
    <Container component="main" maxWidth="xs">
      <div className="register-form">
        <StyledHeader text="Регистрация" />
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="first_name"
            label="Имя"
            name="first_name"
            autoComplete="fname"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="second_name"
            label="Фамилия"
            name="second_name"
            autoComplete="lname"
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
    </Container>
  )
}

export default RegisterPage
