import React, { useEffect } from 'react'
import { Container, Typography, Paper } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '../../store'
import yApiService from 'services/y-api-service'
import { setUser } from 'features/userSlice'
import { adaptUserData } from 'utils/adaptUserData'
import { useParams } from 'react-router'

function UserProfilePage() {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const userData = useSelector((state: Store) => state.user.user)

  useEffect(() => {
    if (userId) {
      yApiService
        .getUserById(userId)
        .then(response => {
          dispatch(setUser(adaptUserData(response.data)))
        })
        .catch(error => {
          console.error('Ошибка при получении данных пользователя:', error)
        })
    }
  }, [dispatch])

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Профиль пользователя
        </Typography>
        <div style={{ margin: '20px 0' }}>
          {userData?.avatar ? (
            <img
              src={userData.avatar}
              alt={'Аватар ' + userData?.firstName}
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
          ) : (
            <Typography variant="subtitle2">Аватар отсутствует</Typography>
          )}
        </div>
        <Typography variant="subtitle1">ID: {userData?.id}</Typography>
        <Typography variant="subtitle1">Имя: {userData?.firstName}</Typography>
        <Typography variant="subtitle1">
          Отображаемое имя: {userData?.displayName}
        </Typography>
      </Paper>
    </Container>
  )
}

export default UserProfilePage
