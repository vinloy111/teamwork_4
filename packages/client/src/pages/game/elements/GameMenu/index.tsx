import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { getTime } from '../../utils/others'

type Props = {
  seconds: number
  breakGame: () => void
  setPause: () => void
}

export const GameMenu = React?.memo(
  ({ seconds, breakGame, setPause }: Props): JSX.Element => {
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
        <Button sx={{ mb: '10px' }} variant="contained" onClick={breakGame}>
          X
        </Button>
        <Button variant="contained" onClick={setPause}>
          Пауза
        </Button>
      </Box>
    )
  }
)
