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

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  element: {
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  mainImage: {
    textAlign: 'center',
    color: theme.palette.text.primary,
    width: '30%',
  },
  card: {
    maxWidth: 150,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  spacing: {
    height: '5%',
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
        <Grid item xs={12} className={classes.element}>
          <img src={money} className={classes.mainImage} alt="money icons" />
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
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  className={classes.media}
                  height="140"
                  image={pie}
                  title="Contemplative Reptile"
                />
                <CardContent>visualize your spending habits.</CardContent>
              </CardActionArea>
            </Card>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.element}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  className={classes.media}
                  height="140"
                  image={pie}
                  title="Contemplative Reptile"
                />
                <CardContent>set goals with the help of piggybot!</CardContent>
              </CardActionArea>
            </Card>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.element}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  className={classes.media}
                  height="140"
                  image={progress}
                  title="Contemplative Reptile"
                />
                <CardContent>see progress on your budgets.</CardContent>
              </CardActionArea>
            </Card>
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
