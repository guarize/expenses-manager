import React, { Component } from 'react';

class ExpensesTableHead extends Component {
  render() {
    return (
      <thead className="table-head">
        <tr>
          <th>Description</th>
          <th>Tag</th>
          <th>Payment Method</th>
          <th>Value</th>
          <th>Currency</th>
          <th>Exchange rate</th>
          <th>Valor convertido</th>
          <th>Converted value</th>
          <th>Edit/Delete</th>
        </tr>
      </thead>
    );
  }
}

export default ExpensesTableHead;
