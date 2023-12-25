import { GridStyled } from './style'
import Menu from '../menu/Menu'
import { Outlet } from 'react-router'
import { LayoutBackground } from 'components/layoutBackground'

const Layout = ({ children }: { children?: JSX.Element }): JSX.Element => (
  <GridStyled>
    <LayoutBackground />
    <Menu />
    <div style={{ overflow: 'auto', height: '100%', zIndex: 2 }}>
      {children || <Outlet />}
    </div>
  </GridStyled>
)

export default Layout
