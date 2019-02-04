import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
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
  spendingByMonth,
  categorizeTransactionsByMonth,
} from '../utils/transactions';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { Sidebar } from './index';

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

class CategoryPieChart extends Component {
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
      <div className="App">
        <header className="App-header">
          <Sidebar />
          <Paper className={classes.root}>
            <FormControl>
              <Select onChange={this.handleMonth}>
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
            <h3>Spending by Category</h3>
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
              <Tooltip />
            </PieChart>
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
              data={this.state.transactions}
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

const mapStateToProps = state => {
  const { accounts, transactions } = state;
  return {
    accounts: accounts.accounts,
    transactions,
  };
};

const ConnectedPieChart = withStyles(styles)(CategoryPieChart);

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(ConnectedPieChart)
);
