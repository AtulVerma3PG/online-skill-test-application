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
      }
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
    const fieldValidationErrors = this.state.formErrors;
    let { emailValid } = this.state;
    let { passwordValid } = this.state;
    let { firstNameValid } = this.state;
    let { lastNameValid } = this.state;
    let { genderValid } = this.state;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : " is too short";
        break;
      case "firstName":
        firstNameValid = value.length >= 3;
        fieldValidationErrors.firstName = firstNameValid ? "" : " is too short";
        break;
      case "lastName":
        lastNameValid = value.length >= 3;
        fieldValidationErrors.lastName = lastNameValid ? "" : " is too short";
        break;
      case "gender":
        console.log(value);
        genderValid = value.length >= 4 && value.length <= 6;
        fieldValidationErrors.gender = genderValid ? "" : " not selected";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid,
        passwordValid,
        lastNameValid,
        firstNameValid,
        genderValid,
      },
      this.validateForm
    );
  }

  /**
   * Store Validity of user Input
   */
  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.firstNameValid &&
        this.state.lastNameValid &&
        this.state.genderValid,
    });
    console.log(this.state);
  }

  /**
   *Show Error message
   *
   * @param {string} error
   * @returns Error message
   */
  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  render() {
    console.log(this.state.formErrors);
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
              } else {
                return "";
              }
            })}
          </div>
          <div>
            <label>FirstName :</label>
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleUserInput}
              placeholder="First Name"
            />
          </div>
          <div>
            <label>LastName :</label>
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleUserInput}
              placeholder="Last Name"
            />
          </div>
          <div>
            <label>Email address :</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleUserInput}
            />
          </div>
          <div>
            <label>Password :</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleUserInput}
              placeholder="Password"
            />
          </div>
          <div>
            <label>Gender : </label>
            <select
              onChange={this.handleUserInput}
              name="gender"
              className="select"
              defaultValue="Select Gender"
            >
              <option defaultValue>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
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
  history: PropTypes.object.isRequired,
};
export default RegistrationForm;
