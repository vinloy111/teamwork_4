import { AppBar, Box, MenuItem, Toolbar, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import Button from '@mui/material/Button'
import yApiService from '../../services/y-api-service'
import { useDispatch } from 'react-redux'
import { clearUser } from 'features/authSlice'

const Menu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
        <Toolbar>
          <MenuItem component={Link} to={'/'}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Home
            </Typography>
          </MenuItem>
          <MenuItem component={Link} to={'/game'}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Game
            </Typography>
          </MenuItem>
          <MenuItem component={Link} to={'/forum'}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Forum
            </Typography>
          </MenuItem>
          <MenuItem component={Link} to={'/leaderboard'}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Leaderboard
            </Typography>
          </MenuItem>
          <MenuItem component={Link} to={'/settings'}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Settings
            </Typography>
          </MenuItem>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Menu
