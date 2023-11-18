import { CardMedia, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { fillUserData } from './utils'
import { mockLeaderboardList } from '../../mocks/leaderboard'
import { Player } from 'types/LidearBoard'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/system/Box'
import { columns } from './settingsGrid'
import Fon1 from '../../assets/images/fon1.png'
import Fon2 from '../../assets/images/fon2.png'
import { CardStyled } from './style'
import { theme } from '../../theme'

export const LeaderBoardComponent = () => {
  const [usersBoard, setUsersBoard] = useState<Player[]>([])
  const getData = () => {
    setUsersBoard(fillUserData(mockLeaderboardList))
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <Stack
      alignItems="center"
      justifyContent={'center'}
      height={'auto'}
      width={'100%'}
      marginTop={theme.spacing(1)}
      sx={{ backgroundImage: Fon1 }}>
      <Typography
        variant={'h3'}
        sx={{
          color: theme.palette.warning.main,
          zIndex: 10,
          backgroundColor: theme.palette.background.paper,
          p: theme.spacing(2),
          m: theme.spacing(2),
          borderRadius: 5,
        }}>
        Таблица Лидеров
      </Typography>
      {usersBoard && usersBoard.length > 0 && (
        <Box sx={{ height: '50%', width: '50%' }}>
          <DataGrid
            rows={usersBoard}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            disableColumnMenu
            rowHeight={120}
            sx={{ zIndex: 10 }}
          />
        </Box>
      )}
      <CardStyled
        sx={{
          right: 0,
          bottom: 0,
          width: 500,
          height: 342,
        }}>
        <CardMedia component="img" alt="fon1" image={Fon1} />
      </CardStyled>
      <CardStyled
        sx={{
          left: 0,
          top: 64,
          width: 500,
          height: 397,
          opacity: '60%',
        }}>
        <CardMedia component="img" alt="fon2" image={Fon2} />
      </CardStyled>
    </Stack>
  )
}
