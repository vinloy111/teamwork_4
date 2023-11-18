import { GridColDef } from '@mui/x-data-grid'
import { theme } from '../../theme'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export const columns: GridColDef[] = [
  {
    field: 'caption',
    headerName: 'Темы',
    width: 500,
    editable: false,
    sortable: false,
    renderCell: props => (
      <Typography variant={'h5'} color={theme.palette.warning.main}>
        {props.value}
      </Typography>
    ),
  },
  {
    field: 'countOfMessage',
    headerName: 'Ответы',
    type: 'number',
    width: 100,
    editable: true,
    renderCell: props => <Typography variant={'h6'}>{props.value}</Typography>,
  },
  {
    field: 'id',
    headerName: '',
    type: 'string',
    width: 100,
    editable: true,
    renderCell: props => (
      <Button href={`/forum/${props.value}`} variant="contained">
        Открыть
      </Button>
    ),
  },
]
