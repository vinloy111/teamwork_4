import { GridStyled } from './style'
import Menu from '../menu/Menu'
import { Outlet } from 'react-router'
import { useSelector } from 'react-redux'
import { Store } from '../../store'

const Layout = () => {
  const user = useSelector((state: Store) => state.auth.user)

  return (
    <GridStyled>
      {user && <Menu />}
      <Outlet />
    </GridStyled>
  )
}

export default Layout
