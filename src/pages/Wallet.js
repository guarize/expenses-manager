import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchApi, addExpense, endEditing } from '../actions';
import Header from '../components/Header';
import Forms from '../components/Forms';
import Chart from '../components/Chart';
import ExpensesTable from '../components/ExpensesTable';
import '../styles/Wallet.css';

const INITIAL_STATE = {
  description: '',
  value: '0',
  method: 'Dinheiro',
  tag: 'Alimentação',
  currency: 'USD',
};

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      ...INITIAL_STATE,
    };

    this.addExpense = this.addExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.finishEditing = this.finishEditing.bind(this);
  }

  componentDidMount() {
    const { getData } = this.props;
    getData();
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }

  async addExpense() {
    const { getData, saveExpense } = this.props;
    await getData();
    const { data } = this.props;
    const expense = {
      ...this.state,
      exchangeRates: {
        ...data,
      },
    };
    saveExpense(expense);
    this.setState({
      ...INITIAL_STATE,
    });
  }

  finishEditing() {
    const { endEdit, oldRate } = this.props;
    const editedExpense = {
      ...this.state,
      exchangeRates: {
        ...oldRate.exchangeRates,
      },
    };
    endEdit(editedExpense);
    this.setState({
      ...INITIAL_STATE,
    });
  }

  render() {
    const { userEmail, data, isEditing } = this.props;
    return (
      <div className="wallet-wrapper">
        <Header userEmail={ userEmail } />
        <div className="wallet-chart-form">
          {isEditing ? (
            <div className="editing-form">
              <Forms
                { ...this.state }
                data={ data }
                handleChange={ this.handleChange }
              />
              <button type="button" onClick={ this.finishEditing }>
                Editar despesa
              </button>
            </div>
          ) : (
            <div className="expenses-form">
              <Forms
                { ...this.state }
                data={ data }
                handleChange={ this.handleChange }
              />
              <button type="button" onClick={ this.addExpense }>
                Adicionar despesa
              </button>
            </div>
          )}
          <Chart />
        </div>
        <ExpensesTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.wallet.data,
  userEmail: state.user.email,
  isEditing: state.wallet.isEditing,
  oldRate: state.wallet.expenseBeingEdited,
});

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(fetchApi()),
  saveExpense: (value) => dispatch(addExpense(value)),
  endEdit: (value) => dispatch(endEditing(value)),
});

Wallet.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  endEdit: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  oldRate: PropTypes.shape({
    exchangeRates: PropTypes.objectOf(PropTypes.object),
  }).isRequired,
  saveExpense: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
