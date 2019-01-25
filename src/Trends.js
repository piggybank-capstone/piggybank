import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import PlaidLink from 'react-plaid-link';
import { LineChart, Line, PieChart, Pie, Legend, Tooltip } from 'recharts';

class Trends extends Component {
  constructor() {
    super();
    // sample data for trying recharts
    this.state = {
      spending: [
        { date: 1, amount: 25 },
        { date: 2, amount: 62 },
        { date: 3, amount: 85 },
        { date: 4, amount: 65 },
        { date: 5, amount: 98 },
        { date: 6, amount: 33 },
      ],
      transactions: [
        { category: 'coffee', amount: 4.23 },
        { category: 'groceries', amount: 68.23 },
        { category: 'groceries', amount: 12.42 },
      ],
    };
  }
  async componentDidMount() {}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>Trends</h3>
          <LineChart width={400} height={400} data={this.state.spending}>
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
          <PieChart width={500} height={500}>
            <Pie
              isAnimationActive={false}
              data={this.state.transactions}
              dataKey="amount"
              cx={200}
              cy={200}
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </header>
      </div>
    );
  }
}

export default Trends;
