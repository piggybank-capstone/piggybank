import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import { LineChart, Line, PieChart, Pie, Tooltip } from 'recharts';
import { Plaid } from './index';
import { getAccounts } from '../store/accounts';

class Trends extends Component {
  // constructor() {
  //   super();
  //   // sample data for trying recharts
  //   this.state = {
  //     spending: [
  //       { date: 1, amount: 25 },
  //       { date: 2, amount: 62 },
  //       { date: 3, amount: 85 },
  //       { date: 4, amount: 65 },
  //       { date: 5, amount: 98 },
  //       { date: 6, amount: 33 },
  //     ],
  //     transactions: [
  //       { category: 'coffee', amount: 4.23 },
  //       { category: 'groceries', amount: 68.23 },
  //       { category: 'groceries', amount: 12.42 },
  //     ],
  //   };
  // }

  async componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>Trends</h3>
          <LineChart
            width={400}
            height={400}
            data={this.props.accounts.balances}
          >
            <Line type="monotone" dataKey="available" stroke="#8884d8" />
          </LineChart>
          <PieChart width={500} height={500}>
            <Pie
              isAnimationActive={false}
              data={this.props.transactions}
              dataKey="amount"
              cx={200}
              cy={200}
              outerRadius={200}
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

const mapStateToProps = state => ({
  accounts: state.accounts,
  transactions: state.transactions,
});

const mapDispatchToProps = dispatch => ({
  // fetchAccounts: token => dispatch(getAccounts(token)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Trends)
);
