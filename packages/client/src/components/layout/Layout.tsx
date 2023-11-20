import { GridStyled } from './style'
import Menu from '../menu/Menu'
import { Outlet } from 'react-router'
import { AppBar, Toolbar } from '@mui/material'

const Layout = () => {
  return (
    <GridStyled>
      <Menu />
      <Outlet />
    </GridStyled>
  )
}

export default Layout
