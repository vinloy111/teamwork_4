import { GridStyled } from './style'
import Menu from '../menu/Menu'
import { Outlet } from 'react-router'

declare type LayoutProps = {
  children: JSX.Element
}

const Layout = () => {
  return (
    <GridStyled>
      <Menu />
      <Outlet />
    </GridStyled>
  )
}

export default Layout
