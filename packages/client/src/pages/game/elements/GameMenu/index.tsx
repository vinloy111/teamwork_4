import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { getTime } from '../../utils'

type Props = {
  seconds: number
  breakGame: () => void
}

export const GameMenu = React?.memo(
  ({ seconds, breakGame }: Props): JSX.Element => {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <Box sx={{ fontSize: '30px', lineHeight: '30px', mb: '10px' }}>
          {getTime(seconds)}
        </Box>
        <Button variant="contained" onClick={breakGame}>
          X
        </Button>
      </Box>
    )
  }
)
