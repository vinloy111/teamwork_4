import React, { useState } from 'react'
import { Button, TextField, Container, Snackbar } from '@mui/material'
import StyledHeader from '../../components/styled-header/StyledHeader'
import yApiService from 'services/y-api-service'
import { useNavigate } from 'react-router-dom'

function ChangePasswordPage() {
  const ERROR_MESSAGE = 'Ошибка при изменении пароля'

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await yApiService.changeUserPassword(passwordData)
      navigate('/settings')
    } catch (error) {
      setError(ERROR_MESSAGE)
      console.error(`${ERROR_MESSAGE} :`, error)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className="change-password-form">
        <StyledHeader text="Смена пароля" />
        <form noValidate onSubmit={handleSubmit}>
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
            value={passwordData.oldPassword}
            onChange={handleChange}
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
            value={passwordData.newPassword}
            onChange={handleChange}
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
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError('')}
          message={error}
        />
      </div>
    </Container>
  )
}

export default ChangePasswordPage
