/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Css/Page.css";
import "bootstrap/dist/css/bootstrap.min.css";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      isRegistered: false,
      formErrors: {
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        password: "",
      },
      firstNameValid: false,
      lastNameValid: false,
      emailValid: false,
      passwordValid: false,
      genderValid: false,
      formValid: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Handle registration form submit
   */
  handleSubmit = () => {
    this.setState(
      {
        isRegistered: true,
      },
      () => {
        this.props.history.push({
          pathname: "/Home",
          state: { ...this.state },
        });
      },
    );
  };

  /**
   *
   * Store and Validate user input
   * @param {object} e User Input
   */
  handleUserInput = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  /**
   * Validate User Input
   *
   * @param {string} fieldName field to validate
   * @param {string} value fields value
   */
  validateField(fieldName, value) {
    const { formErrors } = this.state;
    let { emailValid } = this.state;
    let { passwordValid } = this.state;
    let { firstNameValid } = this.state;
    let { lastNameValid } = this.state;
    let { genderValid } = this.state;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = emailValid ? "" : " is invalid";
        break;
      case "password":
        passwordValid = value.length >= 6;
        formErrors.password = passwordValid ? "" : " is too short";
        break;
      case "firstName":
        firstNameValid = value.length >= 3;
        formErrors.firstName = firstNameValid ? "" : " is too short";
        break;
      case "lastName":
        lastNameValid = value.length >= 3;
        formErrors.lastName = lastNameValid ? "" : " is too short";
        break;
      case "gender":
        genderValid = value.length >= 4 && value.length <= 6;
        formErrors.gender = genderValid ? "" : " not selected";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors,
        emailValid,
        passwordValid,
        lastNameValid,
        firstNameValid,
        genderValid,
      }, () => {
        if (this.state.emailValid
          && this.state.passwordValid
          && this.state.firstNameValid
          && this.state.lastNameValid
          && this.state.genderValid
        ) {
          this.setState({
            formValid: true,
          });
        } else {
          this.setState({
            formValid: false,
          });
        }
      },
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3>User Registration</h3>
          <div className="panel panel-default">
            {Object.keys(this.state.formErrors).map((fieldName) => {
              if (this.state.formErrors[fieldName].length > 0) {
                return (
                  <p key={fieldName}>
                    {fieldName} {this.state.formErrors[fieldName]}
                  </p>
                );
              }
              return "";
            })}
          </div>
          <div>
            <label htmlFor="firstName">FirstName : <input
              type="text"
              name="firstName"
              id="firstName"
              value={this.state.firstName}
              onChange={this.handleUserInput}
              placeholder="First Name"
            />
            </label>
          </div>
          <div>
            <label htmlFor="lastName">LastName :<input
              type="text"
              name="lastName"
              id="lastName"
              value={this.state.lastName}
              onChange={this.handleUserInput}
              placeholder="Last Name"
            />
            </label>
          </div>
          <div>
            <label htmlFor="email">Email address :
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleUserInput}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">Password :
              <input
                type="password"
                name="password"
                id="password"
                value={this.state.password}
                onChange={this.handleUserInput}
                placeholder="Password"
              />
            </label>
          </div>
          <div>
            <label htmlFor="gender">Gender :
              <select
                onChange={this.handleUserInput}
                name="gender"
                id="gender"
                className="select"
                defaultValue="Select Gender"
              >
                <option defaultValue>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
          </div>
          <input
            type="submit"
            value="Submit"
            disabled={!this.state.formValid}
          />
        </form>
      </div>
    );
  }
}

RegistrationForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};
export default RegistrationForm;
