import Box from '@mui/material/Box'
import { Grid, Paper, Stack, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Image404 from '../../assets/images/404.png'
import Image500 from '../../assets/images/404.png'
import { theme } from '../../theme'

declare type TitleComponentProps = {
  title: string
}
export const TitleComponent = ({ title }: TitleComponentProps) => {
  return (
    <Paper
      sx={{
        zIndex: 10,
        p: theme.spacing(2),
        m: theme.spacing(2),
        borderRadius: 5,
      }}>
      <Typography variant={'h3'}>{title}</Typography>
    </Paper>
  )
}
