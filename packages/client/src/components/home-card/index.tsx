import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { theme } from '../../theme'

type Props = {
  title?: string
  items: string[]
}

export const HomeCard = ({ title, items }: Props) => {
  const titleBlock = (
    <Typography
      variant="h5"
      sx={{
        mb: '20px',
        color: theme.palette.warning.main,
      }}
      gutterBottom>
      {title}
    </Typography>
  )

  const renderItem = (text: string) => {
    return <div>{text}</div>
  }

  return (
    <Paper
      sx={{
        padding: '20px',
        borderRadius: '10px',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
      }}>
      {title && titleBlock}
      {items.map(renderItem)}
    </Paper>
  )
}
