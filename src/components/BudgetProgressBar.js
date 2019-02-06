import React from 'react';
import '../styles/progressbar.css';

class BudgetProgressBar extends React.Component {
  render() {
    const { budget, spent } = this.props;

    return (
      <div>
        <progress value={Math.min(spent / budget * 100, 100)} max={100} />
      </div>
    );
  }
}

export default BudgetProgressBar;
