import React from 'react'
import { Button, TextField, Container, Typography } from '@mui/material'
import { theme } from '../../theme'

function LoginPage() {
  return (
    <Container component="main" maxWidth="xs">
      <div className="login-form">
        <Typography
          variant={'h3'}
          sx={{
            color: theme.palette.warning.main,
            zIndex: 10,
            backgroundColor: theme.palette.background.paper,
            p: theme.spacing(2),
            m: theme.spacing(2),
            borderRadius: 5,
          }}>
          Авторизация
        </Typography>
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
