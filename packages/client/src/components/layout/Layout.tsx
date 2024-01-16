import { GridStyled } from './style'
import Menu from '../menu/Menu'
import { Outlet } from 'react-router'
import { useSelector } from 'react-redux'
import { Store } from '../../store'
import { LayoutBackground } from 'components/layoutBackground'
import Footer from 'components/footer/Footer'

const Layout = ({ children }: { children?: JSX.Element }): JSX.Element => {
  const user = useSelector((state: Store) => state.auth.user)

  return (
    <GridStyled>
      <LayoutBackground />
      {user && <Menu />}
      <div style={{ overflow: 'auto', height: '100%', zIndex: 2 }}>
        {children || <Outlet />}
      </div>
      <Footer />
    </GridStyled>
  )
}

export default Layout
