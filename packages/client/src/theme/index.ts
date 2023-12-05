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
    fontFamily: ['Chilanka', 'cursive', 'Arial'].join(','),
    button: {
      fontWeight: 900,
    },

    h1: {
      fontSize: '3rem',
    },

    h2: {
      fontSize: '2.4rem',
    },
    h3: {
      fontSize: '2rem',
    },
    h4: {
      fontSize: '1.5rem',
    },
    h5: {
      fontSize: '1.3rem',
    },
    h6: {
      fontSize: '1.2rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: ['Chilanka', 'cursive', 'Arial'].join(','),
          boxSizing: 'border-box',
        },
      },
    },
  },
}

export const theme = createTheme(themeOptions)
