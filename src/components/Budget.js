import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import { getBudgets, removeBudget, getCategories } from '../store/budget';
import {
  sortTransactionsByMonth,
  getCurrentMonth,
  sortTransactionsByCategory
} from '../../src/utils/transactions.js';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import SingleBudget from './SingleBudget';
import piggybot from '../styles/piggybot.jpg';
import Piggybot from './Piggybot';

const styles = theme => ({
  root: {
    width: '80%',
    // [theme.breakpoints.down(450)]: {
    //   width: '90%'
    // },
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto'
  },
  table: {
    width: '100%',
    margin: 'auto'
  },
  tableCell: {
    padding: '0'
  },
  buttonStyle: {
    // width: '100%',
    margin: 'auto'
  },
  buttonContainer: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    textAlign: 'center'
  }
});

class Budget extends Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
      totalSpent: 0,
      currentMonth: '',
      chatIsHidden: true
    };
  }
  componentDidMount() {
    this.props.getBudgets();
    this.updateTransaction();
    this.updateToCurrentMonth();
  }

  updateTransaction() {
    const transactions = this.props.transactions;
    const budgetObject = sortTransactionsByMonth(transactions);

    this.setState({
      transactions: budgetObject.transactions,
      totalSpent: budgetObject.total
    });
  }
  updateToCurrentMonth() {
    const currentMonth = getCurrentMonth();
    this.setState({
      currentMonth
    });
  }

  render() {
    const { budgets, classes } = this.props;

    return (
      <div>
        <h2>Your Budget</h2>
        <h3>
          You have spent $
          {this.state.totalSpent.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' '}
          this month
        </h3>

        <div>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Amount Budgeted</TableCell>
                  <TableCell align="right">Amount Left</TableCell>
                  <TableCell align="center">On Goal?</TableCell>
                  <TableCell />
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {budgets.map(budget => {
                  return (
                    <SingleBudget
                      key={budget.id}
                      budget={budget}
                      transactions={this.state.transactions}
                      removeBudget={this.props.removeBudget}
                    />
                  );
                })}
              </TableBody>
            </Table>
            <div className={classes.buttonContainer}>
              <NavLink to={'/addABudget'}>
                <Button className={classes.buttonStyle}>
                  Add Or Update A Budget
                </Button>
              </NavLink>
            </div>

            {this.state.chatIsHidden ? (
              <Button
                onClick={() =>
                  this.setState({ chatIsHidden: !this.state.chatIsHidden })
                }
              >
                <img id="piggybot" src={piggybot} alt="pig chatbot icon" />
                Get Help With Your Budget!
              </Button>
            ) : (
              <Button
                onClick={() =>
                  this.setState({ chatIsHidden: !this.state.chatIsHidden })
                }
              >
                <img id="piggybot" src={piggybot} alt="pig chatbot icon" />
                Close Piggybot
              </Button>
            )}
            {!this.state.chatIsHidden && <Piggybot />}
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { accounts, transactions, budget } = state;
  const { budgetList } = budget;
  return {
    accounts: accounts.accounts,
    transactions,
    budgets: budgetList
  };
};

const mapDispatchToProps = dispatch => ({
  getBudgets: () => dispatch(getBudgets()),
  removeBudget: id => dispatch(removeBudget(id))
});

export default withRouter(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Budget)
  )
);
