import { GameResult } from 'types/GameData'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { getTime } from '../../utils/others'
import { PlayerSettings } from 'types/GameStats'
import { useEffect } from 'react'
import { APP_CONSTS } from 'consts/index'

type Props = {
  runGame: () => void
  showStarScreen: () => void
  gameInfo?: GameResult
  playersSettings: PlayerSettings[]
  areasCount: number
}

const pointsByDifficulty = {
  easy: 100,
  medium: 200,
  hard: 300,
  insane: 500,
}

export const FinalScreen = (props: Props): JSX.Element => {
  const { runGame, gameInfo, showStarScreen, playersSettings, areasCount } =
    props
  const seconds = gameInfo?.seconds

  const winner = gameInfo?.stats?.find(i => i.isWinner)
  const winnerSettings = playersSettings.find(i => i.color === winner?.owner)
  const gameHasUser = playersSettings.find(i => i.player === 'user')
  const isUserWin = winnerSettings?.player === 'user'
  const enemyPointsWeight = playersSettings
    .filter(i => i.color !== winner?.owner)
    ?.reduce((acc, i) => {
      return i.difficulty ? acc + pointsByDifficulty[i.difficulty] : acc
    }, 0)

  const preRecordPoints =
    winner && seconds
      ? enemyPointsWeight +
        areasCount * 15 +
        winner?.areasCount * 15 -
        seconds * 2
      : 0
  const recordPoints = preRecordPoints > 0 ? preRecordPoints : 0

  const winnerImg = (
    <img
      src={
        APP_CONSTS.gameResourcesConfig.armies.find(
          i => i.name === winnerSettings?.color
        )?.src
      }
      alt={winnerSettings?.color}
    />
  )

  const result =
    winner && winnerSettings ? (
      <>
        {gameHasUser ? (
          <Typography sx={{ textAlign: 'center' }} variant="h4" gutterBottom>
            {isUserWin ? 'Победа' : 'Поражение'}
          </Typography>
        ) : (
          <></>
        )}
        {gameHasUser && isUserWin ? (
          <Typography sx={{ mt: '20px' }} variant="body1" gutterBottom>
            Набрано очков - {recordPoints}
          </Typography>
        ) : (
          <></>
        )}
        <Typography variant="body1" gutterBottom>
          Длительность - {getTime(seconds)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Победитель - {winnerImg}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Захвачено планет - {`${winner.areasCount} / ${areasCount}`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Размер армии - {winner.count}
        </Typography>
      </>
    ) : (
      <></>
    )

  const button = (
    <Box
      sx={{
        mt: '30px',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
      }}>
      <Button variant="contained" onClick={showStarScreen}>
        Стартовый экран
      </Button>
      <Button variant="contained" onClick={runGame}>
        Начать заново
      </Button>
    </Box>
  )

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Paper
        elevation={24}
        sx={{ maxWidth: 600, padding: '20px', borderRadius: '10px' }}>
        {result}
        {button}
      </Paper>
    </Box>
  )
}
