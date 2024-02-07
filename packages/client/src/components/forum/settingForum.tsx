import { GridColDef } from '@mui/x-data-grid'
import { lightTheme, theme } from '../../theme'
import Typography from '@mui/material/Typography'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import LaunchIcon from '@mui/icons-material/Launch'
import EditIcon from '@mui/icons-material/Edit'
import { Topic } from 'types/Forum'

export const getColumns = (
  topics: Topic[],
  navigate: (url: string) => void,
  userId: string | null,
  onDelete: (id: string) => void,
  themeId: number
) => {
  const columns: GridColDef[] = [
    {
      field: 'caption',
      headerName: 'Темы',
      width: 500,
      editable: false,
      sortable: false,
      renderCell: props => (
        <Typography
          variant={'h5'}
          color={
            themeId === 1
              ? theme.palette.warning.main
              : lightTheme.palette.warning.main
          }
          onClick={() => {
            const topicF = topics.find(topic => topic.caption === props.value)
            if (topicF) navigate(`/forum/${topicF.id}`)
          }}
          sx={{ cursor: 'pointer' }}>
          {props.value}
        </Typography>
      ),
    },
    {
      field: 'userName',
      headerName: 'Автор',
      type: 'string',
      width: 200,
      editable: true,
      renderCell: props => (
        <Typography variant={'h5'}>{props.value}</Typography>
      ),
    },
    {
      field: 'id',
      headerName: '',
      type: 'string',
      width: 120,
      editable: true,
      renderCell: props => {
        const topicF = topics.find(topic => topic.id === props.value)

        return (
          <>
            <IconButton
              onClick={() => navigate(`/forum/${props.value}`)}
              color="secondary"
              size={'small'}>
              <LaunchIcon />
            </IconButton>
            {topicF?.idAuthor === userId && (
              <>
                <IconButton
                  color="secondary"
                  size={'small'}
                  onClick={() => onDelete(props.value)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  size={'small'}
                  onClick={() =>
                    navigate(`/forum/change-topic/${props.value}`)
                  }>
                  <EditIcon />
                </IconButton>
              </>
            )}
          </>
        )
      },
    },
  ]
  return columns
}
