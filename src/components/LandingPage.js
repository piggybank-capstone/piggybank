import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import responsive from './../images/responsive.png';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import money from './../images/icons.png';
import pie from './../images/pie.png';
import progress from './../images/progress.png';
import pig from './../images/pig.png';

const styles = theme => ({
  root: {
    display: 'flex',
    textAlign: 'center',
  },
  mainImage: {
    textAlign: 'center',
    color: theme.palette.text.primary,
    width: '30%',
  },
  card: {
    width: '70%',
    margin: 'auto',
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  center: {
    margin: 'auto',
    paddingTop: '5em',
    paddingBottom: '5em',
  },
  title: {
    margin: 0,
    fontSize: '3em',
  },
  spacing: {
    paddingTop: '7em',
  },
  smallSpace: {
    paddingTop: '3em',
  },
  smallImg: {
    textAlign: 'center',
    color: theme.palette.text.primary,
    width: '60%',
  },
});

const LandingPage = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12} className={classes.elements}>
          <div className={classes.spacing} />
        </Grid>
        <Grid item xs={12}>
          <img src={money} className={classes.mainImage} alt="money icons" />
        </Grid>
        <Grid item xs={12}>
          <h1 className={classes.title}>we make saving fun</h1>
        </Grid>
        <Grid item xs={9} className={classes.center}>
          <div className={classes.smallSpace} />
          <hr />
          <div className={classes.smallSpace} />
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="pie chart"
                className={classes.media}
                height="140"
                image={pie}
              />
              <CardContent>
                <h3>visualize your spending habits.</h3>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="pig icon"
                className={classes.media}
                height="140"
                image={pig}
              />
              <CardContent>
                <h3>set goals with the help of piggybot!</h3>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="progress bars"
                className={classes.media}
                height="140"
                image={progress}
              />
              <CardContent>
                <h3>see progress on your budgets.</h3>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={9} className={classes.center}>
          <div className={classes.smallSpace} />
          <hr />
          <div className={classes.smallSpace} />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.center}>
            <h1>save anywhere</h1>
            <h2>track your progress on multiple devices.</h2>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <img
              className={classes.smallImg}
              src={responsive}
              alt="responsive site"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(LandingPage);
