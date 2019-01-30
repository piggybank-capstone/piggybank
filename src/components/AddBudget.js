import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import { getBudgets, removeBudget } from '../store/budget';
import { sortTransactionsByMonth, getCurrentMonth, sortTransactionsByCategory } from '../../src/utils/transactions.js'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


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
  buttonStyle: {
    width: '50%',
    margin: 'auto',

  },
  buttonContainer: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    textAlign: 'center'


  }

});


class AddBudget extends Component {

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
    const { budgets, classes } = this.props;
    console.log(budgets)
    return (
      <div>
        <h2>Add a budget</h2>


      </div >
    )
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts,
  transactions: state.transactions,
  budgets: state.budget.budgetList
});

const mapDispatchToProps = dispatch => ({
  getBudgets: () => dispatch(getBudgets()),
  removeBudget: (id) => dispatch(removeBudget(id))

});

export default withRouter(
  withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddBudget))
);
