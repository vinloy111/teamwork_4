import { GridStyled } from './style'
import Menu from '../menu/Menu'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <GridStyled>
      <Menu />
      <Outlet />
    </GridStyled>
  )
}

export default Layout
