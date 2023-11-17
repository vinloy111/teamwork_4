import { ThemeOptions } from '@mui/material/styles'
import { createTheme } from '@mui/material'

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffff00',
    },
    background: {
      default: '#21243b',
      paper: '#21243b',
    },
    secondary: {
      main: '#fb983c',
    },
    info: {
      main: '#9c27b0',
    },
    success: {
      main: '#76ff03',
    },
    error: {
      main: '#e54c44',
    },
    warning: {
      main: '#fff176',
    },
  },

  typography: {
    fontFamily: 'Comfortaa,Roboto,sans serif',
    button: {
      fontWeight: 900,
    },
  },
}

export const theme = createTheme(themeOptions)
