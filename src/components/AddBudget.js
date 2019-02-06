import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import {
  getBudgets,
  removeBudget,
  getCategories,
  createOrUpdateBudget
} from '../store/budget';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  root: {
    width: '60%',
    [theme.breakpoints.down(650 + theme.spacing.unit * 3 * 2)]: {
      width: '90%'
    },
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit
  },
  dropDown: {
    width: '100%',
    marginTop: theme.spacing.unit,
    display: 'flex',
    fullWidth: true
  },
  formStyle: {
    alignItems: 'flex-start'
  },
  formControl: {
    margin: 0,
    fullWidth: true,
    display: 'flex'
  }
});

class AddBudget extends Component {
  constructor() {
    super();
    this.state = {
      category: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.createBudget = this.createBudget.bind(this);
  }
  componentDidMount() {
    this.props.getCategories();
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ category: event.target.value });
  };

  createBudget = event => {
    event.preventDefault();

    const categoryId = event.target.category.value;
    const amount = event.target.amount.value;
    this.props.createBudget({ categoryId, amount });
  };

  render() {
    const { classes, categories } = this.props;
    return (
      <div>
        <h2>Add Or Update A Budget</h2>

        <Paper className={classes.root}>
          {categories.length > 0 ? (
            <form onSubmit={this.createBudget}>
              <FormControl className={classes.formControl} display="flex">
                <InputLabel htmlFor="cat">Category</InputLabel>
                <Select
                  autoWidth={true}
                  value={this.state.category}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'category',
                    id: 'cat'
                  }}
                  className={classes.dropDown}
                >
                  {categories.map(category => {
                    if (category.name !== 'Payment' && category.name !== 'Transfer') {
                      return (
                        <MenuItem value={category.id}>{category.name}</MenuItem>
                      );
                    }
                  })}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                  type="number"
                  id="amount"
                  name="amount"
                  label="amount"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                />
                <Button type="submit">Update Budget</Button>
              </FormControl>
            </form>
          ) : (
              <h3>You have all the budget categories</h3>
            )}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { accounts, transactions, budget } = state;
  const { budgetList, categories } = budget;
  return {
    accounts: accounts.accounts,
    transactions,
    budgets: budgetList,
    categories
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  getCategories: () => dispatch(getCategories()),
  createBudget: budget => {
    dispatch(createOrUpdateBudget(budget));
    ownProps.history.push('./budget');
  }
});

export default withRouter(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(AddBudget)
  )
);
