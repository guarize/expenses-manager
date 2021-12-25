import PropTypes from 'prop-types';
import React, { Component } from 'react';

class SelectInput extends Component {
  render() {
    const { id, test, label, options, value, handleChange } = this.props;
    return (
      <label htmlFor={ id }>
        {label}
        <select
          data-testid={ test }
          id={ id }
          name={ id }
          value={ value }
          onChange={ handleChange }
        >
          {options.map((option) => (
            <option key={ option }>{option}</option>
          ))}
        </select>
      </label>
    );
  }
}

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  test: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SelectInput;
