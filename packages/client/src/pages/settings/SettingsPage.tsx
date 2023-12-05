import React, { useEffect, useState } from 'react'
import {
  Button,
  TextField,
  Container,
  Typography,
  Snackbar,
  Avatar,
} from '@mui/material'
import StyledHeader from '../../components/styled-header/StyledHeader'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '../../store'
import yApiService from 'services/y-api-service'
import { setUser } from 'features/authSlice'
import { settingsFormToDto } from 'utils/settingsFormToDto'
import { isAxiosError } from 'axios'
import { adaptUserData } from 'utils/adaptUserData'
import { theme } from 'theme/index'

function SettingsPage() {
  const ERROR_TEXT = 'Ошибка при сохранении изменений'
  const SUCCESS_TEXT = 'Данные успешно изменены'
  const user = useSelector((state: Store) => state.auth.user)
  const [profileData, setProfileData] = useState({
    firstName: '',
    secondName: '',
    displayName: '',
    login: '',
    email: '',
    phone: '',
  })
  const [notification, setNotification] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      // Предзаполняем форму текущими данными пользователя
      setProfileData({
        firstName: user?.firstName || '',
        secondName: user?.secondName || '',
        displayName: user?.displayName || '',
        login: user?.login || '',
        email: user?.email || '',
        phone: user?.phone || '',
      })
    }
  }, [user])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const updatedUser = await yApiService.updateUserProfile(
        settingsFormToDto(profileData)
      )
      dispatch(setUser(adaptUserData(updatedUser.data)))
      setNotification(SUCCESS_TEXT)
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(`${ERROR_TEXT}:`, error.response?.data?.reason)
        setNotification(error.response?.data?.reason || ERROR_TEXT)
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className="settings-form">
        <StyledHeader text="Настройки" />
        <form noValidate onSubmit={handleSubmit}>
          <div style={{ margin: '20px 0' }}>
            {user?.avatar ? (
              <Avatar
                src={user.avatar}
                alt="Аватар"
                sx={{ m: theme.spacing(1), width: 100, height: 100 }}
                variant={'circular'}
              />
            ) : (
              <Typography variant="subtitle2">Аватар отсутствует</Typography>
            )}
            <Typography variant="body2" style={{ marginTop: '20px' }}>
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
            name="firstName"
            autoComplete="fname"
            value={profileData.firstName}
            onChange={handleChange}
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
            value={profileData.secondName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="display_name"
            label="Отображаемое имя"
            name="displayName"
            autoComplete="dname"
            value={profileData.displayName}
            onChange={handleChange}
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
            value={profileData.login}
            onChange={handleChange}
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
            value={profileData.email}
            onChange={handleChange}
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
            value={profileData.phone}
            onChange={handleChange}
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
      <Snackbar
        open={!!notification}
        autoHideDuration={6000}
        onClose={() => setNotification('')}
        message={notification}
      />
    </Container>
  )
}

export default SettingsPage
