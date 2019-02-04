import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import { withStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    width: '50%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto',
  },
  table: {
    width: '100%',
    margin: 'auto',
  },
});

class Sidebar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button>
            <NavLink to="/trends/category-spending">
              <ListItemText primary="Spending by Category" />
            </NavLink>
          </ListItem>
          <ListItem button>
            <NavLink to="/trends/monthly-totals">
              <ListItemText primary="Total Monthly Spending" />
            </NavLink>
          </ListItem>
          <ListItem button>
            <NavLink to="/trends/category-merchant">
              <ListItemText primary="Spending by Merchant" />
            </NavLink>
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

const mapStateToProps = state => {
  const { accounts, transactions } = state;
  return {
    accounts: accounts.accounts,
    transactions,
  };
};

const ConnectedSidbar = withStyles(styles)(Sidebar);

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(ConnectedSidbar)
);
