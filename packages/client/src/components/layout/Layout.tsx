import { GridStyled } from './style'
import Menu from '../menu/Menu'

declare type LayoutProps = {
  children: JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <GridStyled>
      <Menu />
      {children}
    </GridStyled>
  )
}

export default Layout
