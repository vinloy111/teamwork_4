import React from 'react'
import { Typography } from '@mui/material'
import { theme } from '../../theme'

function StyledHeader({ text }: { text: string }) {
  return (
    <Typography
      variant="h3"
      sx={{
        color: theme.palette.warning.main,
        zIndex: 10,
        backgroundColor: theme.palette.background.paper,
        p: theme.spacing(2),
        m: theme.spacing(2),
        borderRadius: 5,
      }}>
      {text}
    </Typography>
  )
}

export default StyledHeader
