import { AppBar, Box, MenuItem, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
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
          <MenuItem component={Link} to={'/login'}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Login
            </Typography>
          </MenuItem>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  )
}

export default Menu
