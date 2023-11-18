import React from 'react'
import { Button, TextField, Container } from '@mui/material'
import StyledHeader from '../../components/styled-header/StyledHeader'

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
        </form>
      </div>
    </Container>
  )
}

export default LoginPage
