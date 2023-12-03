import {
  AppBar,
  Box,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import Button from '@mui/material/Button'
import yApiService from '../../services/y-api-service'
import { useDispatch } from 'react-redux'
import { clearUser } from 'features/authSlice'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import useFullScreen from 'hooks/useFullScreen'

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

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ flexGrow: 1, direction: 'row' }}>
          <MenuItem component={Link} to={'/'}>
            <Typography variant="h6" component="div">
              Home
            </Typography>
          </MenuItem>
          <MenuItem component={Link} to={'/game'}>
            <Typography variant="h6" component="div">
              Game
            </Typography>
          </MenuItem>
          <MenuItem component={Link} to={'/forum'}>
            <Typography variant="h6" component="div">
              Forum
            </Typography>
          </MenuItem>
          <MenuItem component={Link} to={'/leaderboard'}>
            <Typography variant="h6" component="div">
              Leaderboard
            </Typography>
          </MenuItem>
          <MenuItem component={Link} to={'/settings'}>
            <Typography variant="h6" component="div">
              Settings
            </Typography>
          </MenuItem>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
          <Box sx={{ flexGrow: 1 }}></Box>
          <IconButton
            onClick={handleFullScreen}
            aria-label="delete"
            size="large">
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Menu
