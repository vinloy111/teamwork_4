import { GridColDef } from '@mui/x-data-grid'
import { Avatar } from '@mui/material'
import { theme } from '../../theme'
import Typography from '@mui/material/Typography'

export const columns: GridColDef[] = [
  {
    field: 'avatar',
    headerName: '',
    width: 150,
    editable: false,
    sortable: false,
    renderCell: props => (
      <Avatar
        src={props.value || `/avatars/ufo1.png`}
        alt={props.field}
        sx={{ width: 'auto', height: 100, m: theme.spacing(1) }}
        variant={'square'}
      />
    ),
  },
  {
    field: 'name',
    headerName: 'Имя',
    width: 200,
    editable: true,
    renderCell: props => (
      <Typography variant={'h5'} color={theme.palette.warning.main}>
        {props.value}
      </Typography>
    ),
  },
  {
    field: 'scoreCount',
    headerName: 'Очки',
    type: 'number',
    width: 110,
    editable: true,
    renderCell: props => <Typography variant={'h6'}>{props.value}</Typography>,
  },
]
