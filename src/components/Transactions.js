import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//importing Material UI components
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
    margin: 'auto'
  },
  table: {
    minWidth: 300
  }
});

function SimpleTable(props) {
  const { classes, transactions } = props;
  console.log('transactions', transactions);
  return (
    <div>
      <h2>Transactions</h2>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell width="30%">Date</TableCell>
              <TableCell width="50%" align="left">
                Name
              </TableCell>
              <TableCell width="20%" align="right">
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map(transaction => (
              <TableRow key={transactions.id}>
                <TableCell component="th" scope="row">
                  {transaction.date}
                </TableCell>
                <TableCell align="left">{transaction.name}</TableCell>
                <TableCell align="right">
                  $
                  {transaction.amount
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

const WrappedTable = withStyles(styles)(SimpleTable);

const mapState = state => {
  return {
    transactions: state.transactions
  };
};

export default connect(mapState)(WrappedTable);
