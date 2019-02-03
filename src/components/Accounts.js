import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto',
  },
  table: {
    width: '100%',
    margin: 'auto',
  },
});

/* COMPONENT */
class Accounts extends Component {
  render() {
    const { accounts, classes } = this.props;
    return (
      <div>
        <h2>Accounts</h2>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableCell>Account</TableCell>
              <TableCell align="left">Official Name</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="right">Available Balance</TableCell>
              <TableCell align="right">Current Balance</TableCell>
            </TableHead>
            <TableBody>
              {accounts.map(account => {
                return (
                  <TableRow key={account.id}>
                    <TableCell>{account.name}</TableCell>
                    <TableCell align="left">{account.official_name}</TableCell>
                    <TableCell align="left">
                      {account.subtype.charAt(0).toUpperCase() +
                        account.subtype.slice(1)}
                    </TableCell>
                    <TableCell align="right">
                      $
                      {Number(account.balances.available)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    </TableCell>
                    <TableCell align="right">
                      $
                      {Number(account.balances.current)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const mapState = state => {
  const { accounts } = state;
  return {
    accounts: accounts.accounts,
  };
};

export default withStyles(styles)(connect(mapState)(Accounts));
