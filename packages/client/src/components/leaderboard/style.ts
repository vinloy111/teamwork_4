import { Card, CardProps, styled } from '@mui/material'

export const CardStyled = styled(Card)<CardProps>(() => ({
  position: 'absolute',
  right: 0,
  bottom: 0,
  zIndex: 0,
  width: 500,
  height: 342,
  backgroundColor: 'transparent',
  backgroundImage: 'none',
  boxShadow: 'none',
}))
