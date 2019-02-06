import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';

export const theme = createMuiTheme({
  palette: {
    primary: colors.black,
    secondary: colors.grey,
    textColor: colors.teal
  },
  status: {
    danger: 'red'
  },
  typography: {
    fontFamily: 'quicksand',
    useNextVariants: true
  }
});

theme.overrides.MuiButton = {
  root: {
    [theme.breakpoints.down('sm')]: {
      background: '#B2EBF2',
      width: '100%'
    },
    marginTop: '10px',
    [theme.breakpoints.between('sm', 'lg')]: {
      background: '#B2EBF2',
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
      paddingRight: '.2px'
    }
  },
  head: {
    backgroundColor: '#F0F0F0	'
  },
  text: {
    color: 'black'
  }
};

theme.overrides.MuiToolbar = {
  root: {
    [theme.breakpoints.down('xs')]: {
      width: '80%',
      margin: 'auto',
      marginBottom: '10px',
      backgroundColor: '#fff'
    },
    backgroundColor: '#B2EBF2'
  }
};
