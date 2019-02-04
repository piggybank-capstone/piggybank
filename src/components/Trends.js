import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import {
  categorizeTransactions,
  spendingByMonth,
  categorizeTransactionsByMonth,
} from '../utils/transactions';
import { withStyles } from '@material-ui/core';
import { MerchantChart, CategorySpending, MonthlyTotalChart } from './index';

const styles = theme => ({
  root: {
    width: '50%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto',
  },
  table: {
    width: '100%',
    margin: 'auto',
  },
});

class Trends extends Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
      monthlyTotals: [],
    };
    this.handleMonth = this.handleMonth.bind(this);
  }

  async handleMonth(event) {
    let allTransactions = this.props.transactions
      ? categorizeTransactions(this.props.transactions)
      : [];
    this.setState({ transactions: allTransactions });
    if (event.target.value !== 0) {
      let filteredTransactions = await categorizeTransactionsByMonth(
        this.props.transactions,
        event.target.value
      );
      this.setState({ transactions: filteredTransactions });
    }
  }
  componentDidMount() {
    let allTransactions = this.props.transactions
      ? categorizeTransactions(this.props.transactions)
      : [];
    let monthlyTotals = !this.props.transactions
      ? []
      : spendingByMonth(this.props.transactions);
    this.setState({ transactions: allTransactions, monthlyTotals });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <CategorySpending />
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { accounts, transactions } = state;
  return {
    accounts: accounts.accounts,
    transactions,
  };
};

const WrappedTrends = withStyles(styles)(Trends);

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(WrappedTrends)
);
