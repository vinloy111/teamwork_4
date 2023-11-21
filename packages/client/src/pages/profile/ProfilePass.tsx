import { Box, Typography } from '@mui/material'
import PassForm from './PassForm'

const ProfilePass = () => {
  return (
    <Box padding="0 2rem">
      <Typography fontWeight="500" variant="h5" sx={{ mb: '1.5rem' }}>
        Personal Password
      </Typography>
      <PassForm />
    </Box>
  )
}

export default ProfilePass
