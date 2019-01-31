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
    width: '50%',
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
    width: '40%',
    marginTop: theme.spacing.unit
  },
  formStyle: {
    alignItems: 'flex-start'
  }
});

class AddBudget extends Component {
  constructor() {
    super();
    this.state = {
      categeory: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.createBudget = this.createBudget.bind(this);
  }
  componentDidMount() {
    this.props.getCategories();
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ categeory: event.target.value });
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
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="cat">Category</InputLabel>
                <Select
                  value={this.state.categeory}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'category',
                    id: 'cat'
                  }}
                  className={classes.dropDown}
                >
                  {categories.map(categeory => {
                    return (
                      <MenuItem value={categeory.id}>{categeory.name}</MenuItem>
                    );
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

const mapStateToProps = state => ({
  accounts: state.accounts,
  transactions: state.transactions,
  budgets: state.budget.budgetList,
  categories: state.budget.categories
});

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
