import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Paper, Stack } from '@mui/material'
import { theme } from '../../theme'
import { Forum } from 'types/Forum'
import { getColumns } from './settingForum'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import backendService from 'services/backend-service'
import { useSelector } from 'react-redux'
import { Store } from '../../store'
import { LoaderComponent } from 'components/loader/LoaderComponent'
import { TitleComponent } from 'components/title/title'

export const ForumComponent = () => {
  const [forum, setForum] = useState<Forum | null>(null)
  const navigate = useNavigate()
  const user = useSelector((state: Store) => state.auth.user)
  const themeId = useSelector((state: Store) => state.theme.userTheme?.themeId)
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
  if (!forum) return <LoaderComponent />
  return (
    <Stack
      alignItems="center"
      justifyContent={'center'}
      height={'auto'}
      width={'100%'}
      marginTop={theme.spacing(1)}>
      <TitleComponent title={forum?.caption || ''} />

      {forum && forum.listOfTopics && forum.listOfTopics.length > 0 && (
        <Paper>
          <DataGrid
            rows={forum.listOfTopics}
            columns={getColumns(
              forum.listOfTopics,
              navigate,
              user?.id || null,
              onDeleteTopic,
              themeId || 1
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
        </Paper>
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
