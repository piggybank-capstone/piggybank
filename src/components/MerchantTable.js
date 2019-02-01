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
    let maxMerchants = maxMerchant(transactions);
    let mostTrans = countMerchant(this.props.transactions);
    return (
      <div className="App">
        <header className="App-header">
          <Paper className={classes.root}>
            <h3>Top Merchants</h3>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <h4>Merchant Name</h4>
                  </TableCell>
                  <TableCell align="center">
                    <h4>Total Spent</h4>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {maxMerchants.map(merchant => {
                  return (
                    <TableRow>
                      <TableCell align="center">
                        <h5>{merchant.name}</h5>
                      </TableCell>
                      <TableCell align="center">
                        <h5>${merchant.value}</h5>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {/* <h3>Your Spending</h3>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Merchant</TableCell>
                  <TableCell align="center">Spending</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center" />
                  <TableCell align="center" />
                </TableRow>
              </TableBody>
            </Table> */}
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
