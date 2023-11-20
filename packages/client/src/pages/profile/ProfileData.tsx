import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import ProfileForm from './ProfileForm'

const ProfileData = () => {
  const theme = useTheme()
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')
  return (
    <Box padding="0 2rem">
      <Typography fontWeight="500" variant="h5" sx={{ mb: '1.5rem' }}>
        Personal Details
      </Typography>
      <ProfileForm />
    </Box>
  )
}

export default ProfileData
