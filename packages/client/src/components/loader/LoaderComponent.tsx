import Box from '@mui/system/Box'
import { CircularProgress } from '@mui/material'

export function LoaderComponent() {
  return (
    <Box
      display="flex"
      height={'90%'}
      width={'100%'}
      alignItems="center"
      justifyContent="center">
      <CircularProgress />
    </Box>
  )
}
