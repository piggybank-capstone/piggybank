import React from 'react';
import { withRouter } from 'react-router-dom';
import '../App.css';
import { sortTransactionsByCategory } from '../../src/utils/transactions.js';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Emoji from 'react-emoji-render';

import { Button } from '@material-ui/core';
import BudgetProgressBar from './BudgetProgressBar';

const styles = theme => ({
  root: {
    width: '50%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto'
  },
  table: {
    width: '100%',
    margin: 'auto'
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
  }
});

const SingleBudget = props => {
  const { budget, transactions, removeBudget, classes } = props;
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
      <TableCell align="center">
        <BudgetProgressBar budget={budget.amount} spent={spent} />
      </TableCell>
      <TableCell>
        <Button
          align="center"
          onClick={id => {
            removeBudget(budget.id);
          }}
        >
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default withRouter(withStyles(styles)(SingleBudget));
