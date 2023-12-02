import React from 'react'
import { Container, Typography, Paper } from '@mui/material'

function UserProfilePage() {
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
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Профиль пользователя
        </Typography>
        <div style={{ margin: '20px 0' }}>
          <Typography variant="subtitle1">Аватар:</Typography>
          {userData.avatar ? (
            <img
              src={userData.avatar}
              alt="Аватар"
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
          ) : (
            <Typography variant="subtitle2">Аватар отсутствует</Typography>
          )}
        </div>
        <Typography variant="subtitle1">ID: {userData.id}</Typography>
        <Typography variant="subtitle1">Имя: {userData.first_name}</Typography>
        <Typography variant="subtitle1">
          Фамилия: {userData.second_name}
        </Typography>
        <Typography variant="subtitle1">
          Отображаемое имя: {userData.display_name}
        </Typography>
        <Typography variant="subtitle1">Логин: {userData.login}</Typography>
        <Typography variant="subtitle1">
          Электронная почта: {userData.email}
        </Typography>
        <Typography variant="subtitle1">Телефон: {userData.phone}</Typography>
      </Paper>
    </Container>
  )
}

export default UserProfilePage
