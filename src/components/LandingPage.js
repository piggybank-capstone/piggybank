import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import money from './../images/icons.png';
import responsive from './../images/responsive.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  element: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  mainImage: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.primary,
    maxWidth: '50%',
  },
});

const LandingPage = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12} className={classes.element}>
          <img src={money} alt="money icons" />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.element}>
            <h1>we make saving fun.</h1>
          </div>
        </Grid>
        <Grid item xs={10}>
          <div className={classes.element}>
            <hr />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.element}>
            {/* <img src={pie} alt="pie chart" /> */}
            visualize your spending habits.
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.element}>
            {/* <img src={pig} alt="piggybot" /> */}
            set goals with the help of piggybot!
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.element}>
            {/* <img src="https://via.placeholder.com/100" alt="progress bar" /> */}
            see progress on your budgets.
          </div>
        </Grid>
        <Grid item xs={10}>
          <div className={classes.element}>
            <hr />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.element}>
            <img src={responsive} alt="responsive site" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(LandingPage);
