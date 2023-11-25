import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {
  changeBackgroundMusicVolume,
  changeSoundVolume,
} from 'features/gameSettingsSlice'
import { getTime } from '../../utils/others'
import { Store } from 'src/store'

type Props = {
  seconds: number
  breakGame: () => void
  setPause: () => void
  isPause: boolean
}

export const GameMenu = React?.memo((props: Props): JSX.Element => {
  const { seconds, isPause, breakGame, setPause } = props
  const dispatch = useDispatch()
  const { backgroundMusicVolume, soundVolume } = useSelector(
    (state: Store) => state.gameSettings
  )
  const hasVolume = backgroundMusicVolume && soundVolume

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

  const changeVolume = () => {
    dispatch(changeBackgroundMusicVolume(!hasVolume))
    dispatch(changeSoundVolume(!hasVolume))
  }

  const btnStyle = {
    ml: '10px',
    lineHeight: 'unset',
    padding: 0,
    minWidth: '40px',
  }

  const gameMenu = (
    <Box
      sx={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <Box sx={{ fontSize: '30px', lineHeight: '30px' }}>
        {getTime(seconds)}
      </Box>
      <Button sx={btnStyle} variant="contained" onClick={changeVolume}>
        {hasVolume ? '🔇' : '🔊'}
      </Button>
      <Button sx={btnStyle} variant="contained" onClick={setPause}>
        {isPause ? '▶' : '||'}
      </Button>
      <Button sx={btnStyle} variant="contained" onClick={breakGame}>
        X
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
