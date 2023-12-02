import React from 'react'
import { Button, TextField, Container } from '@mui/material'
import StyledHeader from '../../components/styled-header/StyledHeader'

function ChangePasswordPage() {
  return (
    <Container component="main" maxWidth="xs">
      <div className="change-password-form">
        <StyledHeader text="Смена пароля" />
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="oldPassword"
            label="Старый пароль"
            type="password"
            id="oldPassword"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="Новый пароль"
            type="password"
            id="newPassword"
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit">
            Изменить пароль
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default ChangePasswordPage
