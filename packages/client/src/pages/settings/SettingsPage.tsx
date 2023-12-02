import React from 'react'
import { Button, TextField, Container, Typography } from '@mui/material'
import StyledHeader from '../../components/styled-header/StyledHeader'
import { Link } from 'react-router-dom'

function SettingsPage() {
  const userData = {
    id: 1349035,
    first_name: 'АФЫВА',
    second_name: 'В',
    display_name: null,
    login: 'Msasewaw1',
    avatar: null,
    email: 'as2312d@mail.ru',
    phone: '312312312312',
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className="settings-form">
        <StyledHeader text="Настройки" />
        <form noValidate>
          <div style={{ margin: '20px 0' }}>
            {userData?.avatar ? (
              <img
                src={userData.avatar}
                alt="Аватар"
                style={{ maxWidth: '100px', maxHeight: '100px' }}
              />
            ) : (
              <Typography variant="subtitle2">Аватар отсутствует</Typography>
            )}
            <Typography
              variant="body2"
              style={{ marginTop: '20px', textAlign: 'center' }}>
              <Link to="/change-avatar" style={{ marginLeft: '5px' }}>
                Изменить аватар
              </Link>
            </Typography>
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="first_name"
            label="Имя"
            name="first_name"
            autoComplete="fname"
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
            fullWidth
            id="display_name"
            label="Отображаемое имя"
            name="display_name"
            autoComplete="dname"
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
            Сохранить изменения
          </Button>
          <Typography
            variant="body2"
            style={{ marginTop: '20px', textAlign: 'center' }}>
            <Link to="/change-password" style={{ marginLeft: '5px' }}>
              Изменить пароль
            </Link>
          </Typography>
        </form>
      </div>
    </Container>
  )
}

export default SettingsPage
