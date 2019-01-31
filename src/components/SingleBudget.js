import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import { getBudgets } from '../store/budget';
import {
  sortTransactionsByMonth,
  getCurrentMonth,
  sortTransactionsByCategory
} from '../../src/utils/transactions.js';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import { Button } from '@material-ui/core';

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
  }
});

const SingleBudget = props => {
  const { budget, transactions, removeBudget } = props;
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {budget.category.name}
      </TableCell>
      <TableCell align="right">${budget.amount}</TableCell>
      <TableCell align="right">
        $
        {budget.amount -
          sortTransactionsByCategory(budget.category.name, transactions)
            .totalSpent}
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
