import {
  AppBar,
  Box,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import yApiService from '../../services/y-api-service'
import { useDispatch } from 'react-redux'
import { clearUser } from 'features/authSlice'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import LogoutIcon from '@mui/icons-material/Logout'
import useFullScreen from 'hooks/useFullScreen'

const menu = [
  { id: 1, title: 'Главная', link: '' },
  { id: 2, title: 'Игра', link: 'game' },
  { id: 3, title: 'Форум', link: 'forum' },
  { id: 4, title: 'Таблица лидеров', link: 'leaderboard' },
  { id: 5, title: 'Настройки', link: 'settings' },
]

const Menu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isFullscreen, handleFullScreen } = useFullScreen()

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
      <MenuItem key={id} component={Link} to={`/${link}`}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </MenuItem>
    )
  }

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar sx={{ flexGrow: 1, direction: 'row' }}>
          {menu.map(renderMenuLink)}
          <Box sx={{ flexGrow: 1 }}></Box>
          <IconButton
            onClick={handleFullScreen}
            aria-label="delete"
            size="large">
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
          <IconButton onClick={handleLogout} aria-label="delete" size="large">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Menu
