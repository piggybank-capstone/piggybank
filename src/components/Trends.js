import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import { PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts';
import { categorizeTransactions } from '../utils/transactions';

class Trends extends Component {
  render() {
    let data = !this.props.transactions
      ? null
      : categorizeTransactions(this.props.transactions);
    console.log(data);
    const COLORS = [
      '#0088FE',
      '#ff9787',
      '#00C49F',
      '#FFBB28',
      '#FF8042',
      '#ff87db',
    ];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index,
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
    return (
      <div className="App">
        <header className="App-header">
          <h3>Accounts</h3>
          <h3>Transactions</h3>
          <PieChart width={700} height={400} onMouseEnter={this.onPieEnter}>
            <Pie
              data={data}
              cx={250}
              cy={150}
              labelLine={true}
              //label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
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
