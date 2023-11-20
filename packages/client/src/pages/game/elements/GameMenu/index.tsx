import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { getTime } from '../../utils/others'

type Props = {
  seconds: number
  breakGame: () => void
  setPause: () => void
  isPause: boolean
}

export const GameMenu = React?.memo((props: Props): JSX.Element => {
  const { seconds, isPause, breakGame, setPause } = props

  const pauseWrapper = (
    <Box
      sx={{
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        background: '#00000082',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <Typography sx={{ textAlign: 'center' }} variant="h1" component="div">
        Пауза
      </Typography>
      <Typography sx={{ textAlign: 'center' }} variant="h6" component="div">
        Для продолжения игры нажмите кнопку в меню
      </Typography>
    </Box>
  )

  const gameMenu = (
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

  return (
    <>
      {isPause ? pauseWrapper : <></>}
      {gameMenu}
    </>
  )
})
