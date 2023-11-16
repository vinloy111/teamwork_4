import { Grid, GridProps, styled } from '@mui/material'

export const GridStyled = styled(Grid)<GridProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100%',
  width: '100%',
  color: theme.palette.text.primary,
}))
