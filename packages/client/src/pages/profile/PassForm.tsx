import {
  Box,
  Button,
  Paper,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Grid,
  FormControl,
} from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useSelector } from 'react-redux'

import { User } from 'types/User'
import { Store } from '../../store'
import { FormikHelpers } from 'formik/dist/types'
import { useState } from 'react'
import { strengthColor, strengthIndicator } from './password-strength'

type Values = {
  id: string
  login: string
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

const registerSchema = yup.object().shape({
  id: yup.string().required('required'),
  login: yup.string().required('required'),
  oldPassword: yup.string().required('required'),
  newPassword: yup.string().min(6, 'Minimum 6 characters').required('required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('required'),
})

const initialValuesRegister = {
  id: '',
  login: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
}

const PassForm = () => {
  const theme = useTheme()
  const user = useSelector((state: Store) => state.auth.user as User | null)
  if (user !== null) {
    initialValuesRegister.id = user.id
    initialValuesRegister.login = user.login
  }
  const isNonMobile = useMediaQuery(theme.breakpoints.up('sm'))

  const [strength, setStrength] = useState(0)
  const [level, setLevel] = useState<
    { label: string; color: string } | undefined
  >()

  const password = async (
    values: Values,
    onSubmitProps: FormikHelpers<Values>
  ) => {
    // this allows us to send form info with image
    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value as string | Blob)
      }
    })
    console.log(formData)

    const savedUserResponse = await fetch(
      'http://localhost:3001/auth/password',
      {
        method: 'POST',
        body: formData,
      }
    )
    const savedUser = await savedUserResponse.json()
    console.log(savedUser)
    onSubmitProps.resetForm()
  }
  const handleFormSubmit = async (
    values: Values,
    onSubmitProps: FormikHelpers<Values>
  ) => {
    await password(values, onSubmitProps)
  }

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value)
    setStrength(temp)
    setLevel(strengthColor(temp))
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}>
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            width="100%"
            display={isNonMobile ? 'flex' : 'block'}
            gap="2rem"
            justifyContent="space-between"
            boxSizing="border-box">
            <Box flexBasis={isNonMobile ? '48%' : undefined}>
              <Paper sx={{ padding: '10px' }}>
                <Typography
                  fontSize="1rem"
                  color={theme.palette.primary.main}
                  fontWeight="500"
                  mb="1rem">
                  Old Password
                </Typography>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    '& > div': {
                      gridColumn: isNonMobile ? undefined : 'span 4',
                    },
                  }}>
                  <TextField
                    label="Old password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.oldPassword}
                    name="oldPassword"
                    type="password"
                    error={
                      Boolean(touched.oldPassword) &&
                      Boolean(errors.oldPassword)
                    }
                    helperText={touched.oldPassword && errors.oldPassword}
                    sx={{ gridColumn: 'span 4' }}
                  />
                </Box>
              </Paper>
            </Box>
            <Box flexBasis={isNonMobile ? '48%' : undefined}>
              <Paper sx={{ padding: '10px' }}>
                <Typography
                  fontSize="1rem"
                  color={theme.palette.primary.main}
                  fontWeight="500"
                  mb="1rem">
                  New Password
                </Typography>

                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    '& > div': {
                      gridColumn: isNonMobile ? undefined : 'span 4',
                    },
                  }}>
                  <TextField
                    label="New password"
                    onBlur={handleBlur}
                    onChange={e => {
                      handleChange(e)
                      changePassword(e.target.value)
                    }}
                    value={values.newPassword}
                    name="newPassword"
                    type="password"
                    error={
                      Boolean(touched.newPassword) &&
                      Boolean(errors.newPassword)
                    }
                    helperText={touched.newPassword && errors.newPassword}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    label="Сonfirm Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirmPassword}
                    name="confirmPassword"
                    type="password"
                    error={
                      Boolean(touched.confirmPassword) &&
                      Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    sx={{ gridColumn: 'span 4' }}
                  />
                  {strength !== 0 && (
                    <FormControl fullWidth>
                      <Box sx={{ mb: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item>
                            <Box
                              style={{ backgroundColor: level?.color }}
                              sx={{ width: 85, height: 8, borderRadius: '7px' }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle1" fontSize="0.75rem">
                              {level?.label}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </FormControl>
                  )}
                </Box>
              </Paper>
            </Box>
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: theme.palette.success.main,
                color: theme.palette.background.default,
                '&:hover': { color: theme.palette.primary.main },
              }}>
              Change
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default PassForm
