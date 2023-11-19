import React from 'react'
import { Button, TextField, Container, Typography } from '@mui/material'
import StyledHeader from '../../components/styled-header/StyledHeader'
import { Link } from 'react-router-dom'
import './style.css'

function LoginPage() {
  return (
    <Container component="main" maxWidth="xs">
      <div className="login-form">
        <StyledHeader text="Авторизация" />
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Логин"
            name="login"
            autoComplete="login"
            autoFocus
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
    </Container>
  )
}

export default LoginPage
