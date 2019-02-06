import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import pig from './../images/pig.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  element: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.primary,
    border: 1,
  },
});

const LandingPage = props => {
  const { classes } = props;
  console.log(pig);
  return (
    // <div id="header">
    //   <h2 id="title">We Make Saving Fun</h2>
    // </div>
    // <h2>Manage your finances and budget with Piggybot.</h2>
    <div className={classes.root}>
      <Grid container spacing={24}>
        {/* <Grid item xs={12}> */}
        <Grid item xs={4} className={classes.element}>
          <img src="https://via.placeholder.com/100" alt="cash" />
        </Grid>
        <Grid item xs={4} className={classes.element}>
          <img src="https://via.placeholder.com/100" alt="piggybank" />
        </Grid>
        <Grid item xs={4} className={classes.element}>
          <img src="https://via.placeholder.com/100" alt="coins" />
        </Grid>
        {/* </Grid> */}
        <Grid item xs={12}>
          <div className={classes.element}>
            <h2>we make saving fun.</h2>
          </div>
        </Grid>
        <Grid item xs={10}>
          <div className={classes.element}>
            <hr />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.element}>
            <img src="https://via.placeholder.com/100" alt="pie chart" />
            visualize your spending habits.
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.element}>
            <img src="https://via.placeholder.com/100" alt="piggybot" />
            set goals with the help of piggybot!
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.element}>
            <img src="https://via.placeholder.com/100" alt="progress bar" />
            see progress on your budgets.
          </div>
        </Grid>
        <Grid item xs={10}>
          <div className={classes.element}>
            <hr />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.element}>responsive image</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(LandingPage);
