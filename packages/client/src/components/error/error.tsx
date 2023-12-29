import Box from '@mui/material/Box'
import { Grid, Stack, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Image404 from '../../assets/images/404.png'
import Image500 from '../../assets/images/404.png'
import { theme } from '../../theme'

declare type ErrorProps = {
  type: '404' | '500'
  message?: string
}
export const ErrorComponent = ({ type, message }: ErrorProps) => {
  const image = type === '404' ? Image404 : Image500

  return (
    <Grid
      container
      alignItems="stretch"
      justifyContent={'center'}
      height={'auto'}
      width={'100%'}
      marginTop={10}>
      <Grid item xs={5}>
        <Stack
          direction="column"
          justifyContent="space-around"
          alignItems="start"
          height={'100%'}
          padding={5}>
          <Typography
            variant="h1"
            color={theme.palette.warning.main}
            sx={{ fontWeight: 'bold' }}>
            {type}
          </Typography>
          <Typography variant="h3">{message}</Typography>
          <Button href={'/'}>Домой</Button>
        </Stack>
      </Grid>
      <Grid item xs={5} justifyContent="center" alignItems="center">
        <Box>
          <img src={image} alt={type} />
        </Box>
      </Grid>
    </Grid>
  )
}
