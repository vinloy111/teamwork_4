import { ThemeOptions } from '@mui/material/styles'
import { createTheme } from '@mui/material'

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#ccff90',
    },
    background: {
      default: '#111111',
      paper: '#212121',
    },
    secondary: {
      main: '#f4ff81',
    },
    info: {
      main: '#39cff3',
    },
    success: {
      main: '#63fd74',
    },
    error: {
      main: '#ff5759',
    },
    warning: {
      main: '#ffab00',
    },
    text: {
      primary: '#fff',
    },
  },

  typography: {
    fontFamily: 'Comfortaa,Roboto,sans serif',
    button: {
      fontWeight: 900,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(50deg, #8EB264 50%, #f4ff81 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          color: 'white',
          height: 48,
          padding: '0 30px',
          width: 'auto',
          maxWidth: '200px',
        },
      },
    },
  },
}

export const theme = createTheme(themeOptions)
