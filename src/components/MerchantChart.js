import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import {
  COLORS,
  categorizeTransactionsByMerchant,
} from '../utils/transactions';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import { MerchantTable } from './index';

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
  render() {
    const { classes } = this.props;
    let transactions = !this.props.transactions
      ? null
      : categorizeTransactionsByMerchant(this.props.transactions);
    return (
      <div className="App">
        <header className="App-header">
          <Paper className={classes.root}>
            <h3>Spending by Merchant</h3>
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
                label={<RenderDollarLabel />}
              >
                {transactions.map((entry, index) => (
                  <Cell fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={value => '$' + value} />
            </PieChart>
          </Paper>
          <MerchantTable />
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

const WrappedTrends = withStyles(styles)(MerchantChart);

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(WrappedTrends)
);
