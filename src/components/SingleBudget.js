import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';
import { sortTransactionsByCategory } from '../../src/utils/transactions.js';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Emoji from 'react-emoji-render';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import BudgetProgressBar from './BudgetProgressBar';

const styles = theme => ({
  root: {
    width: '50%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'wrap',
    margin: '0'
  },
  table: {
    width: '100%',
    margin: '0'
  },
  tableCell: {
    margin: '0',
    padding: '0'
  },
  column: {
    width: '3%'
  },
  checkboxstyle: {
    margin: 'auto',
    width: '100%'
  },
  emojiStyle: {
    fontSize: '1.5rem'
  },
  fab: {
    margin: theme.spacing.unit,
    height: '1rem',
    width: '2.2rem'
  },
  delete: {
    width: '1.2rem'
  }
});

class SingleBudget extends Component {
  render() {
    const { budget, transactions, removeBudget, classes } = this.props;
    const spent = sortTransactionsByCategory(budget.category.name, transactions)
      .totalSpent;
    const delta = budget.amount - spent;

    return (
      <TableRow>
        <TableCell component="th" scope="row">
          {budget.category.name}
        </TableCell>
        <TableCell align="right">
          ${budget.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
        </TableCell>
        <TableCell align="right">
          ${delta.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
        </TableCell>
        <TableCell align="center">
          {delta > 0 ? (
            <Emoji text="8-)" className={classes.emojiStyle} />
          ) : (
            <Emoji text=":,-(" className={classes.emojiStyle} />
          )}
        </TableCell>
        <TableCell align="center" className={classes.tableCell}>
          <BudgetProgressBar budget={budget.amount} spent={spent} />
        </TableCell>
        <TableCell>
          <Fab
            color="secondary"
            aria-label="Delete"
            className={classes.fab}
            align="center"
            onClick={id => {
              removeBudget(budget.id);
            }}
          >
            <DeleteIcon className={classes.delete} />
          </Fab>
        </TableCell>
      </TableRow>
    );
  }
}

export default withRouter(withStyles(styles)(SingleBudget));
