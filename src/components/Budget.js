import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import { getBudgets } from '../store/budget';


class Budget extends Component {
  componentDidMount() {
    this.props.getBudgets();
  }

  render() {
    const { budget } = this.props;

    return (
      <div>
        <h2>The budget</h2>
        <div>
          <h3>My Budget Goals:</h3>
          {(budget && budget.length > 0) ?
            <ul>
              {budget.map(budget => {
                return (
                  <li>Category {budget.category.name} : I want to budget {budget.amount} this month</li>
                )
              })}
            </ul>
            :
            <p>No budgets</p>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts,
  transactions: state.transactions,
  budget: state.budget.budgetList
});

const mapDispatchToProps = dispatch => ({
  getBudgets: () => dispatch(getBudgets()),

});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Budget)
);
