import { Paper, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { PlayerLeaderBoard } from 'types/LidearBoard'
import { DataGrid } from '@mui/x-data-grid'
import { columns } from './settingsGrid'
import { theme } from '../../theme'
import { getLeaderBoard } from 'pages/leaderboard/leaderboard.controller'
import { TitleComponent } from 'components/title/title'

/** TODO: додумать пагинацию - пока просто получаем 50 строк, для серверной пагинации DATA-GRID хочет общее число строк - api не дает его */
const LEADERBOARD_PAGE_LIMIT = 50
export const LeaderBoardComponent = () => {
  const [usersBoard, setUsersBoard] = useState<PlayerLeaderBoard[]>([])
  const getData = () => {
    getLeaderBoard(0, LEADERBOARD_PAGE_LIMIT).then(result => {
      if (result) {
        const leaderBoard = result.map((item, index) => {
          return { ...item.data, id: String(index) }
        })
        setUsersBoard(leaderBoard)
      }
    })
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
      <TitleComponent title="Таблица Лидеров" />
      {usersBoard && usersBoard.length > 0 && (
        <Paper sx={{ width: '50%' }}>
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
        </Paper>
      )}
    </Stack>
  )
}
