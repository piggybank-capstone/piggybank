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
} from 'recharts';
import { categorizeTransactions, COLORS } from '../utils/transactions';
import { categorizeAccounts } from '../utils/accounts';

class Trends extends Component {
  render() {
    let transactions = !this.props.transactions
      ? null
      : categorizeTransactions(this.props.transactions);
    let accounts = !this.props.accounts
      ? null
      : categorizeAccounts(this.props.accounts);
    console.log(accounts);
    return (
      <div className="App">
        <header className="App-header">
          <h3>Accounts</h3>
          <BarChart
            width={600}
            height={300}
            data={accounts}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
          <h3>Transactions</h3>
          <PieChart width={700} height={400} onMouseEnter={this.onPieEnter}>
            <Pie
              data={transactions}
              cx={250}
              cy={150}
              labelLine={true}
              //label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {transactions.map((entry, index) => (
                <Cell fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts,
  transactions: state.transactions,
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Trends)
);
