import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Stack, Typography } from '@mui/material'
import { theme } from '../../theme'
import { Forum } from 'types/Forum'
import { mockForum } from '../../mocks/forum'
import { getColumns } from './settingForum'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'

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
      <Button
        type="button"
        variant="outlined"
        className="submit"
        onClick={() => navigate(`/forum/add-topic`)}
        sx={{ m: 2 }}>
        Создать тему
      </Button>
    </Stack>
  )
}
