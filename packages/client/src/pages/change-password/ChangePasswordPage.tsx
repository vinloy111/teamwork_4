import React, { useState } from 'react'
import { Button, TextField, Container, Snackbar } from '@mui/material'
import StyledHeader from '../../components/styled-header/StyledHeader'
import yApiService from 'services/y-api-service'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { changePasswordValidationSchema } from 'utils/userValidationSchema'

function ChangePasswordPage() {
  const ERROR_MESSAGE = 'Ошибка при изменении пароля'
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
    },
    validationSchema: changePasswordValidationSchema,
    onSubmit: async values => {
      try {
        await yApiService.changeUserPassword(values)
        navigate('/settings')
      } catch (error) {
        setError(ERROR_MESSAGE)
        console.error(`${ERROR_MESSAGE} :`, error)
      }
    },
  })

  return (
    <Container component="main" maxWidth="xs">
      <div className="change-password-form">
        <StyledHeader text="Смена пароля" />
        <form noValidate onSubmit={formik.handleSubmit}>
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
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.oldPassword}
            error={formik.touched.oldPassword && !!formik.errors.oldPassword}
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
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
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            error={formik.touched.newPassword && !!formik.errors.newPassword}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
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
