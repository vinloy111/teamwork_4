import { GridColDef } from '@mui/x-data-grid'
import { Avatar } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

export const columns: GridColDef[] = [
  {
    field: 'avatar',
    headerName: '',
    width: 150,
    editable: false,
    sortable: false,
    renderCell: props => {
      const theme = useTheme()
      return (
        <Avatar
          src={props.value || `/avatars/ufo1.png`}
          sx={{
            width: 'auto',
            height: 100,
            m: theme.spacing(1),
            borderRadius: 3,
          }}
          variant={'square'}
        />
      )
    },
  },
  {
    field: 'name',
    headerName: 'Имя',
    width: 200,
    editable: true,
    renderCell: props => {
      const theme = useTheme()
      return (
        <Typography variant={'h5'} color={theme.palette.warning.main}>
          {props.value}
        </Typography>
      )
    },
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
