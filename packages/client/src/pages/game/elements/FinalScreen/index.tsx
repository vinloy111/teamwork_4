import { GameStats } from 'types/GameData'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

type Props = {
  runGame: () => void
  showStarScreen: () => void
  gameInfo?: GameStats[]
}

export const FinalScreen = ({
  runGame,
  gameInfo,
  showStarScreen,
}: Props): JSX.Element => {
  const resultTable = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Фракция</TableCell>
            <TableCell align="right">Размер войска</TableCell>
            <TableCell align="right">Подконтрольные территории</TableCell>
            <TableCell align="right">Результат</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gameInfo?.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.owner}
              </TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell align="right">{row.areasCount}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

  const result = (
    <>
      <Typography variant="h4" gutterBottom>
        Статистика сессии:
      </Typography>
      <Typography variant="body1" gutterBottom>
        Длительнось - TODO
      </Typography>
      {resultTable}
    </>
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
