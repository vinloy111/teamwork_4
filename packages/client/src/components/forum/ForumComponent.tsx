import { CardMedia, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import ImageForBackground1 from '../../assets/images/fon1.png'
import ImageForBackground2 from '../../assets/images/fon2.png'
import { theme } from '../../theme'
import { Forum } from 'types/Forum'
import { mockForum } from '../../mocks/forum'
import { getColumns } from './settingForum'
import { CardStyled } from '../leaderboard/style'
import { useNavigate } from 'react-router-dom'

export const ForumComponent = () => {
  const [forum, setForum] = useState<Forum | null>(null)
  const navigate = useNavigate()
  const getForum = () => {
    setForum(mockForum)
  }
  useEffect(() => {
    getForum()
  }, [])
  return (
    <Stack
      alignItems="center"
      justifyContent={'center'}
      height={'auto'}
      width={'100%'}
      marginTop={theme.spacing(1)}>
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
        {forum?.caption || ''}
      </Typography>
      {forum && forum.listOfTopics && forum.listOfTopics.length > 0 && (
        <DataGrid
          rows={forum.listOfTopics}
          columns={getColumns(navigate)}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          disableRowSelectionOnClick
          disableColumnMenu
          rowHeight={120}
          sx={{ zIndex: 10 }}
        />
      )}
      <CardStyled
        sx={{
          right: 0,
          bottom: 0,
          width: 500,
          height: 342,
        }}>
        <CardMedia component="img" alt="fon1" image={ImageForBackground1} />
      </CardStyled>
      <CardStyled
        sx={{
          left: 0,
          top: 64,
          width: 500,
          height: 397,
          opacity: '60%',
        }}>
        <CardMedia component="img" alt="fon2" image={ImageForBackground2} />
      </CardStyled>
    </Stack>
  )
}
