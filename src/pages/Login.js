import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { FaFacebook, FaGooglePlusG } from 'react-icons/fa';
import { saveEmail } from '../actions';
import Blobs from '../components/Blobs';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      emailInput: '',
      passwordInput: '',
      buttonDisable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  validateButton() {
    // Referencia para regex https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const { passwordInput, emailInput } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    const MIN_LENGTH = 6;
    this.setState({
      buttonDisable: !(
        emailRegex.test(emailInput) && passwordInput.length >= MIN_LENGTH
      ),
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState(
      {
        [name]: value,
      },
      this.validateButton,
    );
  }

  handleClick() {
    const { emailInput } = this.state;
    const { history, email } = this.props;
    email(emailInput);
    history.push('/carteira');
  }

  render() {
    const { emailInput, passwordInput, buttonDisable } = this.state;
    return (
      <div className="login-wrapper">
        <Blobs />
        <div className="login-container">
          <h1 className="login-title">Sign in.</h1>
          <div className="login-btns">
            <button type="button">
              <FaGooglePlusG className="login-icons" />
              Continue with Google
            </button>
            <button type="button">
              <FaFacebook className="login-icons" />
              Continue with Facebook
            </button>
          </div>
          <span className="login-or">or</span>
          <div className="login-inputs">
            <input
              data-testid="email-input"
              type="email"
              name="emailInput"
              value={ emailInput }
              placeholder="E-mail"
              onChange={ this.handleChange }
            />
            <input
              data-testid="password-input"
              type="password"
              name="passwordInput"
              value={ passwordInput }
              placeholder="Password"
              onChange={ this.handleChange }
            />
          </div>
          <button
            type="button"
            className="login-btn"
            disabled={ buttonDisable }
            onClick={ this.handleClick }
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  email: (value) => dispatch(saveEmail(value)),
});

Login.propTypes = {
  email: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
