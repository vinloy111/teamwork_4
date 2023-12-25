import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import yApiService from '../../services/y-api-service'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from 'features/authSlice'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import useFullScreen from 'hooks/useFullScreen'
import { theme } from 'theme/index'
import { Store } from '../../store'

const menu = [
  { id: 1, title: 'Главная', link: '' },
  { id: 2, title: 'Игра', link: 'game' },
  { id: 3, title: 'Форум', link: 'forum' },
  { id: 4, title: 'Таблица лидеров', link: 'leaderboard' },
  { id: 5, title: 'Настройки', link: 'settings', onlyLoggedUser: true },
]
// TODO: Неиспользуемый код
// function stringAvatar(name: string) {
//   return {
//     sx: {
//       bgcolor: theme.palette.success,
//     },
//     children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
//   }
// }

const Menu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isFullscreen, handleFullScreen } = useFullScreen()
  const { pathname } = useLocation()
  const user = useSelector((state: Store) => state.auth.user)

  const handleLogout = async () => {
    try {
      await yApiService.logout()
      dispatch(clearUser())
      navigate('/login')
    } catch (error) {
      console.error('Ошибка выхода из системы:', error)
    }
  }

  const renderMenuLink = ({
    id,
    title,
    link,
  }: {
    id: number
    title: string
    link: string
  }) => {
    return (
      <MenuItem
        key={id}
        component={NavLink}
        to={`/${link}`}
        selected={
          link ? pathname.includes(`/${link}`) : pathname === `/${link}`
        }>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </MenuItem>
    )
  }

  const userAvatar = (
    <MenuItem component={NavLink} to={`/settings`}>
      <Avatar
        src={user?.avatar}
        alt="Аватар"
        sx={{ m: theme.spacing(1), width: 40, height: 40, margin: 0 }}
        variant={'circular'}
      />
    </MenuItem>
  )

  const fullscreenButton = (
    <IconButton onClick={handleFullScreen} aria-label="delete" size="large">
      {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
    </IconButton>
  )

  const loginButton = (
    <IconButton
      onClick={() => navigate('/login')}
      aria-label="delete"
      size="large">
      <LoginIcon />
    </IconButton>
  )

  const logoutButton = (
    <IconButton onClick={handleLogout} aria-label="delete" size="large">
      <LogoutIcon />
    </IconButton>
  )

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar sx={{ flexGrow: 1, direction: 'row' }}>
          {menu.filter(i => !i.onlyLoggedUser || user?.id).map(renderMenuLink)}
          <Box sx={{ flexGrow: 1 }}></Box>
          {user?.avatar ? userAvatar : null}
          {fullscreenButton}
          {user?.id ? logoutButton : loginButton}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Menu
