import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import { editExpense, removeExpense } from '../actions';
import ExpensesTableHead from './ExpensesTableHead';

class ExpensesTable extends Component {
  render() {
    const { expenses, deleteExpense, beginEditing } = this.props;
    return (
      <table className="table">
        <ExpensesTableHead />
        <tbody className="table-body">
          {expenses.map(
            ({ exchangeRates, currency, description, tag, method, value }) => (
              <tr key={ description }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{value}</td>
                <td>{exchangeRates[currency].name.split('/')[0]}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>{(value * exchangeRates[currency].ask).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    className="edit-button"
                    onClick={ () => beginEditing(description) }
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    className="delete-button"
                    onClick={ () => deleteExpense(description) }
                  >
                    <BsFillTrashFill />
                  </button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (value) => dispatch(removeExpense(value)),
  beginEditing: (value) => dispatch(editExpense(value)),
});

ExpensesTable.propTypes = {
  deleteExpense: PropTypes.func.isRequired,
  beginEditing: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
