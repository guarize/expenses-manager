import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userEmail, value } = this.props;
    return (
      <div className="header-container">
        <p data-testid="total-field" className="header-value">
          <span>Total Spend:</span>
          {value.toFixed(2)}
        </p>
        {/* <p data-testid="header-currency-field">BRL</p> */}
        <p data-testid="email-field" className="header-email">
          {userEmail}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  value: state.wallet.expenses.reduce(
    (acc,
      { value, exchangeRates, currency }) => value * exchangeRates[currency].ask + acc,
    0,
  ),
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
