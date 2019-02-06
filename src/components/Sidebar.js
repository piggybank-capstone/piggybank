import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import { withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  root: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto',
  },
  table: {
    width: '100%',
    margin: 'auto'
  },
  tableHeader: {
    fontSize: '1.5em',
    textAlign: 'center'
  },
  tableCell: {
    fontSize: '1em',
    height: '50px',
    textAlign: 'center'
  }
});

class Sidebar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="sidebar">
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>Chart Types</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover>
              <TableCell className={classes.tableCell}>
                <NavLink to="/trends/category-spending">
                  Spending by Category
                </NavLink>
              </TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell className={classes.tableCell}>
                <NavLink to="/trends/monthly-totals">
                  Total Monthly Spending
                </NavLink>
              </TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell className={classes.tableCell}>
                <NavLink to="/trends/category-merchant">
                  Spending by Merchant
                </NavLink>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
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
