import { Card, CardMedia, CardProps, styled } from '@mui/material'
import ImageForBackground1 from '../../assets/images/fon1.png'
import ImageForBackground2 from '../../assets/images/fon2.png'
import ImageForBackground3 from '../../assets/images/ship.png'
import ImageForBackground4 from '../../assets/images/fonufo.png'

const CardStyled = styled(Card)<CardProps>(() => ({
  position: 'absolute',
  right: 0,
  bottom: 0,
  zIndex: 1,
  backgroundColor: 'transparent',
  backgroundImage: 'none',
  boxShadow: 'none',
  userSelect: 'none',
}))

export const LayoutBackground = ({
  showShip,
  showUfo,
}: {
  showShip?: boolean
  showUfo?: boolean
}) => (
  <>
    {!showShip && !showUfo && (
      <CardStyled
        sx={{
          right: 0,
          bottom: 0,
          width: 500,
          height: 342,
        }}>
        <CardMedia component="img" alt="fon1" image={ImageForBackground1} />
      </CardStyled>
    )}
    <CardStyled
      sx={{
        left: 0,
        top: 0,
        width: 500,
        height: 397,
      }}>
      <CardMedia component="img" alt="fon2" image={ImageForBackground2} />
    </CardStyled>
    {showShip && (
      <CardStyled
        sx={{
          right: 0,
          bottom: 0,
        }}>
        <CardMedia component="img" alt="fon2" image={ImageForBackground3} />
      </CardStyled>
    )}
    {showUfo && (
      <CardStyled
        sx={{
          right: 0,
          bottom: 0,
        }}>
        <CardMedia component="img" alt="fon2" image={ImageForBackground4} />
      </CardStyled>
    )}
  </>
)
