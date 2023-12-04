import { Card, CardMedia, CardProps, styled } from '@mui/material'
import { useLocation } from 'react-router'
import ImageForBackground1 from '../../assets/images/fon1.png'
import ImageForBackground2 from '../../assets/images/fon2.png'

const CardStyled = styled(Card)<CardProps>(() => ({
  position: 'absolute',
  right: 0,
  bottom: 0,
  zIndex: 1,
  width: 500,
  height: 342,
  backgroundColor: 'transparent',
  backgroundImage: 'none',
  boxShadow: 'none',
  userSelect: 'none',
}))

export const LayoutBackground = () => {
  const location = useLocation()

  return location.pathname !== '/game' ? (
    <>
      <CardStyled
        sx={{
          right: 0,
          bottom: 0,
          width: 500,
          height: 342,
        }}>
        <CardMedia component="img" alt="fon1" image={ImageForBackground1} />
      </CardStyled>
      <CardStyled
        sx={{
          left: 0,
          top: 0,
          width: 500,
          height: 397,
          opacity: '60%',
        }}>
        <CardMedia component="img" alt="fon2" image={ImageForBackground2} />
      </CardStyled>
    </>
  ) : (
    <></>
  )
}
