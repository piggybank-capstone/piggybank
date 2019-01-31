import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import {
  categorizeTransactions,
  COLORS,
  sortTransactionsByMonth,
  spendingByMonth,
} from '../utils/transactions';
import { categorizeAccounts } from '../utils/accounts';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';

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
  render() {
    const { classes } = this.props;
    let transactions = !this.props.transactions
      ? null
      : categorizeTransactions(this.props.transactions);
    let accounts = !this.props.accounts
      ? null
      : categorizeAccounts(this.props.accounts);
    let months = !this.props.transactions
      ? null
      : spendingByMonth(this.props.transactions);
    return (
      <div className="App">
        <header className="App-header">
          <Paper className={classes.root}>
            <h3>Spending by Category</h3>
            <PieChart
              className={classes.table}
              width={700}
              height={400}
              onMouseEnter={this.onPieEnter}
            >
              <Pie
                data={transactions}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {transactions.map((entry, index) => (
                  <Cell fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </Paper>

          <Paper className={classes.root}>
            <h3>Total Spending Over Time</h3>
            <BarChart
              className={classes.table}
              width={600}
              height={300}
              data={months}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <ReferenceLine y={0} stroke="#000" />
              <Bar dataKey="value" fill="#82ca9d" cx="50%" cy="50%" />
            </BarChart>
          </Paper>

          <Paper className={classes.root}>
            <h3>Spending by Category</h3>
            <RadarChart
              className={classes.root}
              cx={300}
              cy={250}
              outerRadius={150}
              width={600}
              height={500}
              data={transactions}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar
                className={classes.table}
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </Paper>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts,
  transactions: state.transactions,
});

const WrappedTrends = withStyles(styles)(Trends);

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(WrappedTrends)
);
