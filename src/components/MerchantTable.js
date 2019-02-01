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
  categorizeTransactionsByMerchant,
  maxMerchant,
  countMerchant,
} from '../utils/transactions';
import { categorizeAccounts } from '../utils/accounts';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  root: {
    width: '50%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto',
  },
  table: {
    width: '100%',
    margin: 'auto',

  },
});

class MerchantTable extends Component {
  render() {
    const { classes } = this.props;
    let transactions = !this.props.transactions
      ? null
      : categorizeTransactionsByMerchant(this.props.transactions);
    let mostSpent = maxMerchant(transactions);
    let mostTrans = countMerchant(this.props.transactions);
    return (
      <div className="App">
        <header className="App-header">
          <Paper className={classes.root}>
            <h3>Merchant</h3>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Top Merchant</TableCell>
                  <TableCell align="center">Most Purchases</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">
                    {mostSpent.maxMerchant.map(merchant => {
                      return <h6>{merchant}</h6>
                    })}
                    <p>{mostSpent.maxAmount}</p>
                  </TableCell>
                  <TableCell align="center">
                    {mostTrans.merchants.map(merchant => {
                      return <h6>{merchant}</h6>
                    })}
                    <p>{mostTrans.count}</p>
                  </TableCell>

                </TableRow>
              </TableBody>
            </Table>

            <h3>Your Spending</h3>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Merchant</TableCell>
                  <TableCell align="center">Spending</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">

                  </TableCell>
                  <TableCell align="center">

                  </TableCell>

                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </header>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts,
  transactions: state.transactions,
});

const WrappedMerhcantTable = withStyles(styles)(MerchantTable);

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(WrappedMerhcantTable)
);
