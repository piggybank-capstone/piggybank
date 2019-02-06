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
  typography: { useNextVariants: true }
});

theme.overrides.MuiButton = {
  root: {
    [theme.breakpoints.down('sm')]: {
      background: 'linear-gradient(45deg, #83EAF1 30%, #63A4FF 90%)',
      width: '100%'
    },
    marginTop: '10px',
    [theme.breakpoints.between('sm', 'lg')]: {
      background: 'linear-gradient(45deg, #83EAF1 30%, #63A4FF 90%)',
      margin: theme.spacing.unit,
      text: {
        border: 1,
        color: 'black',
        padding: '10px 30px',
        margin: '10px',
        height: 40
      },
      width: '30%'
    },
    borderRadius: 3,
    border: 1,
    fullWidth: true
  }
};

theme.overrides.MuiTableCell = {
  root: {
    [theme.breakpoints.down(900)]: {
      padding: '0'
    }
  }
};

theme.overrides.MuiToolbar = {
  root: {
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      margin: 'auto',
      marginBottom: '10px'
    }
  }
};
