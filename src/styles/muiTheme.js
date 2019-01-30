import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';

export const theme = createMuiTheme({
  palette: {
    primary: colors.white,
    secondary: colors.blue,
    textColor: colors.white
  },
  status: {
    danger: 'red'
  },
  overrides: {
    MuiButton: {
      text: {
        background: 'linear-gradient(45deg, #83EAF1 30%, #63A4FF 90%)',
        borderRadius: 3,
        border: 1,
        color: 'black',
        height: 40,
        padding: '10px 30px',
        margin: '10px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
      }
    }
  },
  typography: { useNextVariants: true }
});
