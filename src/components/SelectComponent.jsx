import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SelectInput from './SelectInput';

class SelectComponent extends Component {
  render() {
    const { currency, method, tag, data, handleChange } = this.props;
    return (
      <>
        <SelectInput
          id="currency"
          test="currency-input"
          label="Currency"
          value={ currency }
          options={
            data && Object.keys(data).filter((money) => money !== 'USDT')
          }
          handleChange={ handleChange }
        />
        <SelectInput
          id="method"
          test="method-input"
          label="Payment Method"
          value={ method }
          options={ ['Cash', 'Credit Card', 'Debit Card'] }
          handleChange={ handleChange }
        />
        <SelectInput
          id="tag"
          test="tag-input"
          label="Tag"
          value={ tag }
          options={ ['Food', 'Leisure', 'Work', 'Transport', 'Health'] }
          handleChange={ handleChange }
        />
      </>
    );
  }
}

SelectComponent.propTypes = {
  currency: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  handleChange: PropTypes.func.isRequired,
  method: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

export default SelectComponent;
