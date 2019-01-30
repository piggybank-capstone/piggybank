import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import { getBudgets } from '../store/budget';
import { sortTransactionsByMonth, getCurrentMonth, sortTransactionsByCategory } from '../../src/utils/transactions.js'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';




class Budget extends Component {

  constructor() {
    super();
    this.state = {
      transactions: [],
      totalSpent: 0,
      currentMonth: ''
    }
  }
  componentDidMount() {
    this.props.getBudgets();
    this.updateTransaction();
    this.updateToCurrentMonth();
  }

  updateTransaction() {
    const transactions = this.props.transactions;
    const budgetObject = sortTransactionsByMonth(transactions)

    this.setState({
      transactions: budgetObject.transactions,
      totalSpent: budgetObject.total
    })

  }
  updateToCurrentMonth() {

    const currentMonth = getCurrentMonth();
    this.setState({
      currentMonth
    })
  }


  render() {
    const { budget } = this.props;
    console.log(this.state)
    return (
      <div>
        <div>
          <Paper >
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat (g)</TableCell>
                  <TableCell align="right">Carbs (g)</TableCell>
                  <TableCell align="right">Protein (g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {budget.map(budget => (
                  <TableRow key={budget.id}>
                    <TableCell component="th" scope="row">
                      {budget.name}
                    </TableCell>
                    <TableCell align="right">1</TableCell>
                    <TableCell align="right">3</TableCell>
                    <TableCell align="right">4</TableCell>
                    <TableCell align="right">5</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
        <h2>The budget</h2>
        <h3>You have spent ${this.state.totalSpent} this month</h3>
        <div>
          <h3>My Budget Goals:</h3>
          {(budget && budget.length > 0) ?
            <ul>
              {budget.map(budget => {
                return (
                  <div>
                    <li key={budget.id}>Category {budget.category.name} : I want to budget {budget.amount} this month</li>
                    <p>You have ${budget.amount - sortTransactionsByCategory(budget.category.name, this.state.transactions).totalSpent} left</p>
                  </div>
                )
              })}
            </ul>
            :
            <p>No budgets</p>
          }
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts,
  transactions: state.transactions,
  budget: state.budget.budgetList
});

const mapDispatchToProps = dispatch => ({
  getBudgets: () => dispatch(getBudgets()),

});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Budget)
);
