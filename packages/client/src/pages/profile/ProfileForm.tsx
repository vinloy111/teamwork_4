import { useState } from 'react'
import {
  Box,
  Button,
  Paper,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Formik, FormikValues } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
//import { setLogin } from "state";
import Dropzone from 'react-dropzone'
import FlexBetween from '../../components/FlexBetween'
import { User } from 'types/User'
import { Store } from '../../store'
import { FormikHelpers } from 'formik/dist/types'

type Values = User & { picture: File }

const phoneRegExp = /^([+]?[0-9\s-()]{3,25})*$/i

const registerSchema = yup.object().shape({
  id: yup.string().required('required'),
  firstName: yup.string(),
  lastName: yup.string(),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  login: yup.string().required('required'),
  picturePath: yup.string(),
  email: yup.string().email(),
  site: yup.string().url(),
})

const initialValuesRegister = {
  id: '',
  firstName: '',
  lastName: '',
  location: '',
  viewedProfile: 0,
  phone: '',
  login: '',
  picturePath: '',
  email: '',
  numberInTheTop: 0,
  occupation: '',
  impressions: '',
  aboutMe: '',
  site: '',
}

const ProfileForm = () => {
  const { palette } = useTheme()
  const user = useSelector((state: Store) => state.auth.user as User | null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isNonMobile = useMediaQuery('(min-width:600px)')

  const register = async (
    values: Values,
    onSubmitProps: FormikHelpers<Values>
  ) => {
    // this allows us to send form info with image
    const formData = new FormData()
    for (const value in values) {
      formData.append(value, values[value])
    }
    formData.append('picturePath', values.picture.name)

    const savedUserResponse = await fetch(
      'http://localhost:3001/auth/register',
      {
        method: 'POST',
        body: formData,
      }
    )
    const savedUser = await savedUserResponse.json()
    onSubmitProps.resetForm()
  }
  const handleFormSubmit = async (
    values: Values,
    onSubmitProps: FormikHelpers<Values>
  ) => {
    await register(values, onSubmitProps)
  }
  console.log('init', { ...initialValuesRegister, ...user })
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={{ ...initialValuesRegister, ...user }}
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
                  color={palette.primary.main}
                  fontWeight="500"
                  mb="1rem">
                  Personal Information
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
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    label="Occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name="occupation"
                    error={
                      Boolean(touched.occupation) && Boolean(errors.occupation)
                    }
                    helperText={touched.occupation && errors.occupation}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location"
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    label="About Me"
                    multiline={true}
                    rows={3}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.aboutMe}
                    name="aboutMe"
                    error={Boolean(touched.aboutMe) && Boolean(errors.aboutMe)}
                    helperText={touched.aboutMe && errors.aboutMe}
                    sx={{ gridColumn: 'span 4' }}
                  />
                </Box>
              </Paper>
            </Box>
            <Box flexBasis={isNonMobile ? '48%' : undefined}>
              <Paper sx={{ padding: '10px' }}>
                <Typography
                  fontSize="1rem"
                  color={palette.primary.main}
                  fontWeight="500"
                  mb="1rem">
                  Contact Information
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
                    label="Phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    name="phone"
                    error={Boolean(touched.phone) && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    label="Site"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.site}
                    name="site"
                    error={Boolean(touched.site) && Boolean(errors.site)}
                    helperText={touched.site && errors.site}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <Box
                    gridColumn="span 4"
                    border={`1px solid ${palette.success.main}`}
                    borderRadius="5px"
                    p="1rem">
                    <Dropzone
                      accept={{ 'image/jpeg': [], 'image/png': [] }}
                      multiple={false}
                      onDrop={acceptedFiles =>
                        setFieldValue('picture', acceptedFiles[0])
                      }>
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{ '&:hover': { cursor: 'pointer' } }}>
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
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
                backgroundColor: palette.success.main,
                color: palette.background.default,
                '&:hover': { color: palette.primary.main },
              }}>
              SAVE
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default ProfileForm
