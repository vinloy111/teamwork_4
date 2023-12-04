import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { GameDifficulty, Player, PlayerSettings } from 'types/GameStats'
import { APP_CONSTS } from 'consts/index'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

type Props = {
  runGame: () => void
  isLoaded: boolean
  playersSettings: PlayerSettings[]
  setPlayersSettings: React.Dispatch<React.SetStateAction<PlayerSettings[]>>
  areasCount: number
  setAreasCount: React.Dispatch<React.SetStateAction<number>>
}

export const StartScreen = (props: Props): JSX.Element => {
  const {
    isLoaded,
    playersSettings,
    setPlayersSettings,
    areasCount,
    setAreasCount,
    runGame,
  } = props

  const title = (
    <>
      <Typography
        variant="h1"
        sx={{ textAlign: 'center', mb: '50px', fontSize: '30px' }}
        gutterBottom>
        {APP_CONSTS.gameName}
      </Typography>
    </>
  )

  const difficultyConf = [
    { value: GameDifficulty.easy, label: 'Легкая' },
    { value: GameDifficulty.medium, label: 'Средняя' },
    { value: GameDifficulty.hard, label: 'Сложная' },
    { value: GameDifficulty.insane, label: 'Безумная' },
  ]

  const playerConf = [
    { value: Player.user, label: 'Игрок' },
    { value: Player.computer, label: 'Компьютер' },
    { value: Player.none, label: 'Отсутствует' },
  ]

  const renderSelectPlayer = (conf: PlayerSettings) => {
    return (
      <Select
        sx={{ width: '150px' }}
        value={conf.player}
        onChange={e =>
          setPlayersSettings(v =>
            v.map(i => {
              const newPlayerValue = e.target.value as Player
              const changeDefaultDifficult = {
                [Player.user]: undefined,
                [Player.computer]: GameDifficulty.easy,
                [Player.none]: undefined,
              }
              return i.color === conf.color
                ? {
                    ...i,
                    player: newPlayerValue,
                    difficulty: changeDefaultDifficult[newPlayerValue],
                  }
                : newPlayerValue === Player.user && i.player === Player.user
                ? {
                    ...i,
                    player: Player.none,
                    difficulty: changeDefaultDifficult[Player.none],
                  }
                : i
            })
          )
        }>
        {playerConf.map(i => (
          <MenuItem key={i.value} value={i.value}>
            {i.label}
          </MenuItem>
        ))}
      </Select>
    )
  }

  const renderSelectDifficulty = (conf: PlayerSettings) => {
    return conf.player === Player.computer ? (
      <Select
        sx={{ width: '150px' }}
        value={conf.difficulty}
        onChange={e => {
          setPlayersSettings(v =>
            v.map(i => {
              return i.color === conf.color
                ? { ...i, difficulty: e.target.value as GameDifficulty }
                : i
            })
          )
        }}>
        {difficultyConf.map(i => (
          <MenuItem key={i.value} value={i.value}>
            {i.label}
          </MenuItem>
        ))}
      </Select>
    ) : (
      <></>
    )
  }

  const configTable = (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Цвет</TableCell>
            <TableCell>Управление</TableCell>
            <TableCell>Сложность</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playersSettings?.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <img
                  src={
                    APP_CONSTS.gameResourcesConfig.armies.find(
                      i => i.name === row.color
                    )?.src
                  }
                  alt={row.color}
                />
              </TableCell>
              <TableCell>{renderSelectPlayer(row)}</TableCell>
              <TableCell>{renderSelectDifficulty(row)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

  const areasConf = [{ value: 12 }, { value: 16 }, { value: 20 }, { value: 24 }]

  const selectAreas = (
    <FormControl>
      <RadioGroup
        row
        sx={{ display: 'inline-block' }}
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
  )

  const settingsBlock = (
    <>
      <Typography variant="subtitle1" gutterBottom>
        Настройки сторон конфликта:
      </Typography>
      {configTable}
      <Typography
        sx={{ mt: '10px', mr: '20px', display: 'inline-block' }}
        variant="subtitle1"
        gutterBottom>
        Количество планет:
      </Typography>
      {selectAreas}
    </>
  )

  const withoutMinPlayers =
    playersSettings.filter(i => i.player !== Player.none).length < 2

  const button = (
    <Box
      sx={{ mt: '30px', flex: 1, display: 'flex', justifyContent: 'center' }}>
      <Button
        variant="contained"
        onClick={runGame}
        disabled={!isLoaded || withoutMinPlayers}>
        Начать игру
      </Button>
    </Box>
  )

  return (
    <Box
      sx={{
        width: '600px',
        height: '100%',
        ml: 'auto',
        mr: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Paper
        elevation={24}
        sx={{ maxWidth: 1200, padding: '20px', borderRadius: '10px' }}>
        {title}
        {settingsBlock}
        {button}
      </Paper>
    </Box>
  )
}
