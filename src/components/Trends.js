import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import { PieChart, Pie, Sector, Tooltip, Cell } from 'recharts';

class Trends extends Component {
  async componentDidMount() {
    console.log(this.props);
  }

  render() {
    let recreation = this.props.transactions
      .filter(item => item.category[0] === 'Recreation')
      .reduce((total, num) => {
        return total + parseFloat(num.amount);
      }, 0);
    console.log(recreation);
    const data = [
      { name: 'recreation', value: recreation },
      { name: 'Group B', value: 300 },
      { name: 'Group C', value: 300 },
      { name: 'Group D', value: 200 },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
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
          <h3>Trends</h3>
          {/* <PieChart width={500} height={500}>
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
          </PieChart> */}
          <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
            <Pie
              data={data}
              cx={300}
              cy={200}
              labelLine={false}
              //label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
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
