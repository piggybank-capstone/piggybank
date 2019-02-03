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
    margin: 'auto',
  },
  table: {
    minWidth: 300,
  },
});

function Transactions(props) {
  const { classes, transactions } = props;
  return (
    <div>
      <h2>Transactions</h2>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell width="20%">Date</TableCell>
              <TableCell width="40%" align="left">
                Name
              </TableCell>
              <TableCell width="20%" align="left">
                Category
              </TableCell>
              <TableCell width="20%" align="right">
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map(transaction => (
              <TableRow key={transaction.id}>
                <TableCell component="th" scope="row">
                  {transaction.date}
                </TableCell>
                <TableCell align="left">{transaction.name}</TableCell>
                <TableCell align="left">
                  {transaction.category ? transaction.category[0] : null}
                </TableCell>
                <TableCell align="right">
                  $
                  {transaction.amount
                    ? transaction.amount
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

Transactions.propTypes = {
  classes: PropTypes.object.isRequired,
};

const WrappedTransactions = withStyles(styles)(Transactions);

const mapState = state => {
  return {
    transactions: state.transactions,
  };
};

export default connect(mapState)(WrappedTransactions);
