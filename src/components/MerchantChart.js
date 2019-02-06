import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import {
  COLORS,
  categorizeTransactionsByMerchant,
  categorizeTransactionsByMerchantByMonth,
  spendingByMonth
} from '../utils/transactions';
import Paper from '@material-ui/core/Paper';
import { withStyles, InputLabel } from '@material-ui/core';
import { MerchantTable, Sidebar } from './index';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  root: {
    width: '70%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100%'
    }
  },
  table: {
    width: '100%',
    margin: 'auto'
  },
  container: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100vw'
    }
  },
  sidebar: {
    flexGrow: 1,
    width: '30%'
  },
  chart: {
    flexGrow: 1
  },
  formControl: {
    minWidth: 180,
    margin: theme.spacing.unit * 4
  }
});

function RenderDollarLabel(props) {
  return (
    <text
      className="recharts-text recharts-pie-label-text"
      x={props.x}
      y={props.y}
      fill={props.fill}
      textAnchor={props.textAnchor}
    >
      <tspan alignmentBaseline="middle">${props.value}</tspan>
    </text>
  );
}

class MerchantChart extends Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
      monthlyTotals: [],
      selectedMonth: 0
    };
  }

  handleMonth = async event => {
    let transactions = !this.props.transactions
      ? []
      : categorizeTransactionsByMerchant(this.props.transactions);
    this.setState({ transactions: transactions });
    if (event.target.value !== 0) {
      let filteredTransactions = await categorizeTransactionsByMerchantByMonth(
        this.props.transactions,
        event.target.value
      );
      this.setState({
        transactions: filteredTransactions,
        selectedMonth: event.target.value
      });
    }
  };

  componentDidMount() {
    let allTransactions = this.props.transactions
      ? categorizeTransactionsByMerchant(this.props.transactions)
      : [];
    let monthlyTotals = !this.props.transactions
      ? []
      : spendingByMonth(this.props.transactions);
    this.setState({ transactions: allTransactions, monthlyTotals });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Sidebar className={classes.sidebar} />
        <div className={classes.chart}>
          <Paper className={classes.root}>
            <FormControl className={classes.formControl}>
              <InputLabel>Month</InputLabel>
              <Select
                onChange={this.handleMonth}
                value={this.state.selectedMonth}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={1}>January</MenuItem>
                <MenuItem value={7}>July</MenuItem>
                <MenuItem value={8}>August</MenuItem>
                <MenuItem value={9}>September</MenuItem>
                <MenuItem value={10}>October</MenuItem>
                <MenuItem value={11}>November</MenuItem>
                <MenuItem value={12}>December</MenuItem>
              </Select>
            </FormControl>
            <h3>Spending by Merchant</h3>
            <PieChart
              className={classes.table}
              width={700}
              height={400}
              onMouseEnter={this.onPieEnter}
            >
              <Pie
                data={this.state.transactions}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={150}
                fill="#8884d8"
                label={<RenderDollarLabel />}
              >
                {this.state.transactions.map((entry, index) => (
                  <Cell fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={value => '$' + value} />
            </PieChart>
          </Paper>
          <MerchantTable
            className={classes.root}
            transactions={this.state.transactions}
            month={this.state.selectedMonth}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { accounts, transactions } = state;
  return {
    accounts: accounts.accounts,
    transactions
  };
};

const WrappedTrends = withStyles(styles)(MerchantChart);

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(WrappedTrends)
);
