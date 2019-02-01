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
    return (
      <div className="App">
        <header className="App-header">
          <Paper className={classes.root}>
            <h3>Merchant</h3>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="right">Top Merchant</TableCell>
                  <TableCell align="right">Most Purchases</TableCell>
                  <TableCell align="center">Most Expensive Per Visit</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="right">
                    {mostSpent.maxMerchant.map(merchant => {
                      return <h6>{merchant}</h6>
                    })}
                    <p>{mostSpent.maxAmount}</p>
                  </TableCell>
                  <TableCell align="right">Test Merch</TableCell>
                  <TableCell align="center">Merch #3</TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
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

const WrappedMerhcantTable = withStyles(styles)(MerchantTable);

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(WrappedMerhcantTable)
);
