import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import { GameDifficulty } from 'types/GameStats'
import { APP_CONSTS } from '../../../../consts'

type Props = {
  runGame: () => void
  isLoaded: boolean
  difficulty: GameDifficulty
  setDifficulty: React.Dispatch<React.SetStateAction<GameDifficulty>>
  areasCount: number
  setAreasCount: React.Dispatch<React.SetStateAction<number>>
}

export const StartScreen = (props: Props): JSX.Element => {
  const {
    isLoaded,
    difficulty,
    setDifficulty,
    areasCount,
    setAreasCount,
    runGame,
  } = props

  const title = (
    <>
      <Typography
        variant="h3"
        sx={{ textAlign: 'center', mb: '50px' }}
        gutterBottom>
        {APP_CONSTS.gameName}
      </Typography>
    </>
  )

  const difficultyConf = [
    { value: GameDifficulty.easy, label: 'Легкая' },
    { value: GameDifficulty.medium, label: 'Средняя' },
    { value: GameDifficulty.hard, label: 'Сложная' },
  ]

  const selectDifficulty = (
    <Typography variant="body1" gutterBottom>
      <FormControl>
        <FormLabel>Выбор сложности:</FormLabel>
        <RadioGroup
          row
          value={difficulty}
          onChange={(_, v) => setDifficulty(v as GameDifficulty)}>
          {difficultyConf.map(i => (
            <FormControlLabel
              key={i.value}
              value={i.value}
              control={<Radio />}
              label={i.value}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Typography>
  )

  const areasConf = [{ value: 12 }, { value: 16 }, { value: 20 }, { value: 24 }]

  const selectAreas = (
    <Typography variant="body1" gutterBottom>
      <FormControl>
        <FormLabel>Количество планет:</FormLabel>
        <RadioGroup
          row
          value={areasCount}
          onChange={(_, v) => setAreasCount(Number(v))}>
          {areasConf.map(i => (
            <FormControlLabel
              key={i.value}
              value={i.value}
              control={<Radio />}
              label={i.value}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Typography>
  )

  const settings = (
    <>
      <Typography variant="h4" gutterBottom>
        Настройки:
      </Typography>
      {selectDifficulty}
      {selectAreas}
    </>
  )

  const button = (
    <Box
      sx={{ mt: '30px', flex: 1, display: 'flex', justifyContent: 'center' }}>
      <Button variant="contained" onClick={runGame} disabled={!isLoaded}>
        Начать игру
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
        {title}
        {settings}
        {button}
      </Paper>
    </Box>
  )
}
