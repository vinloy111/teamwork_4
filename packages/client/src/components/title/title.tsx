import { Paper, Typography } from '@mui/material'
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
