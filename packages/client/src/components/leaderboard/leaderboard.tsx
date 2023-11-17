import { Grid, Stack, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { theme } from '../../theme'
import { useEffect, useState } from 'react'
import { fillUserData } from './utils'
import { mockLeaderboardList } from '../../mocks/leaderboard'
import { Player } from 'types/LidearBoard'

export const LeaderBoardComponent = () => {
  const [usersBoard, setUsersBoard] = useState<Player[]>([])
  const getData = () => {
    setUsersBoard(fillUserData(mockLeaderboardList))
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <Grid
      container
      alignItems="stretch"
      justifyContent={'center'}
      height={'auto'}
      width={'100%'}
      marginTop={10}>
      <Typography variant={'h3'}>Таблица Лидеров</Typography>
    </Grid>
  )
}
