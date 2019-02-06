import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import {
  Legend,
  BarChart,
  Bar,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  categorizeTransactions,
  spendingByMonth,
  categorizeTransactionsByMonth,
} from '../utils/transactions';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import { Sidebar } from '.';

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
      width: '100%',
    },
  },
  table: {
    width: '100%',
    margin: 'auto',
  },
  container: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100vw',
    },
  },
  chart: {
    flexGrow: 1,
  },
});

function CustomizedYAxisTick(props) {
  return (
    <text x={props.x} y={props.y} textAnchor={props.textAnchor}>
      ${props.payload.value}
    </text>
  );
}

class MonthlyTotalChart extends Component {
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
      <div className={classes.container}>
        <Sidebar className={classes.sidebar} />
        <div className={classes.chart}>
          <Paper className={classes.root}>
            <h3>Total Spending Over Time</h3>
            <ResponsiveContainer width="99%" height={350}>
              <BarChart
                className={classes.table}
                // width={600}
                // height={300}
                data={this.state.monthlyTotals}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis dataKey="value" tick={<CustomizedYAxisTick />} />
                <Tooltip formatter={value => '$' + value} />
                <Legend wrapperStyle={{ bottom: 0 }} />
                <ReferenceLine y={0} stroke="#000" />
                <Bar
                  name="Month"
                  dataKey="value"
                  fill="#82ca9d"
                  cx="50%"
                  cy="50%"
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </div>
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

const ConnectedTotalsChart = withStyles(styles)(MonthlyTotalChart);

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(ConnectedTotalsChart)
);
