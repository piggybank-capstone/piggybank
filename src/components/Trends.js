import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import { LineChart, Line, PieChart, Pie, Tooltip, Cell } from 'recharts';

class Trends extends Component {
  async componentDidMount() {
    console.log(this.props);
  }

  render() {
    let recreation = this.props.transactions.filter(
      item => item.category[0] === 'Recreation'
    );
    console.log(recreation);
    return (
      <div className="App">
        <header className="App-header">
          <h3>Trends</h3>
          <PieChart width={500} height={500}>
            <Pie
              name={
                this.props.transactions.category
                  ? this.props.transactions.category[0]
                  : null
              }
              isAnimationActive={false}
              data={this.props.transactions}
              dataKey="amount"
              cx={300}
              cy={300}
              outerRadius={100}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
          <PieChart width={500} height={500}>
            <Pie
              name="recreation"
              isAnimationActive={true}
              data={recreation}
              dataKey="amount"
              cx={300}
              cy={300}
              outerRadius={100}
            >
              <Cell data={recreation} dataKey="amount" fill="#8884d8" />
            </Pie>
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

const mapDispatchToProps = {
  // fetchAccounts,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Trends)
);
