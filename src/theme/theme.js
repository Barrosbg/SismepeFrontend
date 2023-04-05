import { createTheme, adaptV4Theme } from '@mui/material/styles';

const theme = createTheme(adaptV4Theme({
  palette: {
    primary: {
      main: '#145DA0',
      light: '#61dafb',
      dark: '#cecece',
    },
    secondary: {
      main: '#e04747',
      light: '#61dafb',
      dark: '#cecece',
    },
    error: {
      main: "#e04747",
      light: "#e04747",
      dark: "#e04747",
    },
    success: {
      main: "#22bb33",
      light: "#22bb33",
      dark: "#22bb33",
    },
    background: {
      light: '#edf2fb',
      // default: 'rgb(208 202 202 / 14%)',
      default: "#fff !important"
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960
    },
  },
  overrides: {
    MuiPaper: {
//       root: {
//         padding: '20px 10px',
//         margin: '10px',
//         backgroundColor: '#fff',
//       },
//     },

      rounded:{
        // border: '0.2px solid #e6e2e2'
      }
//     MuiButton: {
//       root: {
//         margin: '5px',
//       },
    },
  },
}));
export default theme;