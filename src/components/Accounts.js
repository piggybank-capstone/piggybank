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
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

/* COMPONENT */
class Accounts extends Component {
  render() {
    const { accounts, classes } = this.props;
    return (
      <div>
        <h4>Accounts</h4>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableCell>Account</TableCell>
              <TableCell align="right">Official Name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Available Balance</TableCell>
              <TableCell align="right">Current Balance</TableCell>
            </TableHead>
            <TableBody>
              {accounts.map(account => {
                return (
                  <TableRow key={account.id}>
                    <TableCell>{account.name}</TableCell>
                    <TableCell align="right">{account.official_name}</TableCell>
                    <TableCell align="right">{account.subtype}</TableCell>
                    <TableCell align="right">
                      {account.balances.available}
                    </TableCell>
                    <TableCell align="right">
                      {account.balances.current}
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
  return {
    accounts: state.accounts,
  };
};

export default withStyles(styles)(connect(mapState)(Accounts));
