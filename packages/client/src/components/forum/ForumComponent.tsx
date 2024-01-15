import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Stack, Typography } from '@mui/material'
import { theme } from '../../theme'
import { Forum } from 'types/Forum'
import { getColumns } from './settingForum'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import backendService from 'services/backend-service'
import { useSelector } from 'react-redux'
import { Store } from '../../store'

export const ForumComponent = () => {
  const [forum, setForum] = useState<Forum | null>(null)
  const navigate = useNavigate()
  const user = useSelector((state: Store) => state.auth.user)
  const getForum = () => {
    backendService
      .getForum()
      .then(res => setForum(res.data))
      .catch(console.error)
  }
  useEffect(() => {
    getForum()
  }, [])

  const onDeleteTopic = (id: string) => {
    backendService
      .deleteTopic(id)
      .then(() => getForum())
      .catch(console.error)
  }
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
          columns={getColumns(
            forum.listOfTopics,
            navigate,
            user?.id || null,
            onDeleteTopic
          )}
          initialState={{
            pagination:
              forum.listOfTopics.length > 5
                ? {
                    paginationModel: {
                      pageSize: 5,
                    },
                  }
                : undefined,
          }}
          pageSizeOptions={[5]}
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
