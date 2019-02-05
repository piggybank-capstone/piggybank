import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
//importing Material UI components
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MenuItem from '@material-ui/core/MenuItem';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getCategories } from '../store/budget';
import { filterTransactionsByCategory } from '../utils/transactions.js'



const styles = theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto',
    [theme.breakpoints.down(700)]: {
      width: '100%',
      height: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  table: {
    width: '100%',
    margin: 'auto',
  },
  dropDown: {
    width: '100%',
    fullWidth: true,
    textSize: '1em'
  },
});

class Transactions extends Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      selectedCategory: 'All',
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
    this.props.getCategories();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };


  handleChange = event => {
    event.preventDefault();
    this.setState({ selectedCategory: event.target.value });
  };

  render() {
    const { classes, transactions, categories } = this.props;
    const filteredTransactions = filterTransactionsByCategory(transactions, this.state.selectedCategory);
    const { width } = this.state;
    const isMobile = width <= 700;
    console.log("Selected Category", this.state.selectedCategory);
    console.log(filteredTransactions)

    if (isMobile) {
      return (
        <div id="transactionsTable">
          <h2>Transactions</h2>
          <InputLabel htmlFor="cat">Category</InputLabel>
          <Select
            autoWidth={true}
            value={this.state.selectedCategory}
            onChange={this.handleChange}
            inputProps={{
              name: 'category',
              id: 'cat',
            }}
            className={classes.dropDown}
          >
            <MenuItem value='All'>All</MenuItem>
            {categories.map(category => {
              return (
                <MenuItem value={category.name}>{category.name}</MenuItem>
              );
            })}
          </Select>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell width="20%">Date</TableCell>
                <TableCell width="50%" align="left">
                  Name
                </TableCell>
                <TableCell width="30%" align="right">
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell component="th" scope="row">
                    {transaction.date}
                  </TableCell>
                  <TableCell align="left">{transaction.name}</TableCell>
                  <TableCell align="right">
                    $
                    {transaction.amount
                      ? transaction.amount
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                      : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      );
    } else {
      return (
        <div id="transactionsTable">
          <h2>Transactions</h2>

          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell width="20%">Date</TableCell>
                  <TableCell width="40%" align="left">
                    Name
                  </TableCell>
                  <TableCell width="20%" align="left">
                    Category
                    <Select
                      autoWidth={true}
                      value={this.state.selectedCategory}
                      onChange={this.handleChange}
                      inputProps={{
                        name: 'category',
                        id: 'cat',
                      }}
                      className={classes.dropDown}
                    >
                      <MenuItem value='All'>All</MenuItem>
                      {categories.map(category => {
                        return (
                          <MenuItem value={category.name}>{category.name}</MenuItem>
                        );
                      })}
                    </Select>
                  </TableCell>
                  <TableCell width="20%" align="right">
                    Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTransactions.map(transaction => (
                  <TableRow key={transaction.id}>
                    <TableCell component="th" scope="row">
                      {transaction.date}
                    </TableCell>
                    <TableCell align="left">{transaction.name}</TableCell>
                    <TableCell align="left">
                      {transaction.category ? transaction.category[0] : null}
                    </TableCell>
                    <TableCell align="right">
                      $
                      {transaction.amount
                        ? transaction.amount
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                        : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      );
    }
  }
}

Transactions.propTypes = {
  classes: PropTypes.object.isRequired,
};

const WrappedTransactions = withStyles(styles)(Transactions);

const mapState = state => {
  return {
    transactions: state.transactions,
    categories: state.budget.categories
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  getCategories: () => dispatch(getCategories())
});

export default connect(mapState, mapDispatchToProps)(WrappedTransactions);
