import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SelectComponent from './SelectComponent';

class Forms extends Component {
  render() {
    const { value, description, handleChange, data } = this.props;
    return (
      <>
        <label htmlFor="value">
          Value
          <input
            data-testid="value-input"
            type="number"
            id="value"
            name="value"
            value={ value }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="description">
          Description
          <input
            data-testid="description-input"
            type="text"
            id="description"
            name="description"
            value={ description }
            onChange={ handleChange }
          />
        </label>
        {data && <SelectComponent { ...this.props } />}
      </>
    );
  }
}

Forms.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  description: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Forms;
