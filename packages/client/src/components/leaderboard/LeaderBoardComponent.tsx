import { Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { fillUserData } from './utils'
import { mockLeaderboardList } from '../../mocks/leaderboard'
import { Player } from 'types/LidearBoard'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/system/Box'
import { columns } from './settingsGrid'
import { theme } from '../../theme'
import StyledHeader from '../styled-header/StyledHeader'

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
      marginTop={theme.spacing(1)}>
      <StyledHeader text="Таблица Лидеров" />
      {usersBoard && usersBoard.length > 0 && (
        <Box sx={{ width: '50%' }}>
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
    </Stack>
  )
}
