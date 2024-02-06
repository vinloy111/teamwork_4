import { ThemeOptions } from '@mui/material/styles'
import { createTheme } from '@mui/material'

export const darkThemeOptions: ThemeOptions = {
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
          width: '100vw',
          height: '100vh',
          margin: 0,
          fontFamily: ['Chilanka', 'cursive', 'Arial'].join(','),
          boxSizing: 'border-box',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        a: {
          color: '#ffff00',
        },
      },
    },
  },
}

export const theme = createTheme(darkThemeOptions)

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f7f0fa',
      paper: 'rgb(247,228,255)',
    },
    secondary: {
      main: '#9c27b0',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#9c27b0',
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
          width: '100vw',
          height: '100vh',
          margin: 0,
          fontFamily: ['Chilanka', 'cursive', 'Arial'].join(','),
          boxSizing: 'border-box',
          backgroundColor: '#f0f2f5',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        a: {
          color: '#1976d2',
        },
      },
    },
  },
}

export const lightTheme = createTheme(lightThemeOptions)
