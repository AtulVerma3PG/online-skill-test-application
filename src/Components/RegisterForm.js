import React, { Component } from "react";
import PropTypes from "prop-types";
// import { useHistory } from "react-router-dom";
import { isLogin, login } from "./utils";
import withLayout from "../hoc/withLayout";
import "bootstrap/dist/css/bootstrap.min.css";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    if (isLogin()) {
      props.history.push("/Home");
    }
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
    const { history } = this.props;
    this.setState(
      {
        isRegistered: true,
      },
      () => {
        login();
        this.setLocalStorage();
        history.push({
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

  setLocalStorage = () => {
    localStorage.setItem("userDetails", JSON.stringify(this.state));
  }

  /**
   * Validate User Input
   *
   * @param {string} fieldName field to validate
   * @param {string} value fields value
   */
  validateField(fieldName, value) {
    const { formErrors } = this.state;
    let {
      emailValid, passwordValid, firstNameValid, lastNameValid, genderValid,
    } = this.state;

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
        if (emailValid
          && passwordValid
          && firstNameValid
          && lastNameValid
          && genderValid
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
    const {
      formErrors, firstName, lastName, password, email, formValid,
    } = this.state;
    return (
      <div className="form registration-form container">
        <div className="row">
          <div className="col-md-3 register-left">
            <h3>Welcome</h3>
            <p>You are few minutes away from you online accessement!
            </p>
          </div>
          <div className="col-md-9 register-right">
            <form onSubmit={this.handleSubmit} className="container">
              <h3 className="register-heading">User Registration</h3>

              <div className="row">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="form-control"
                    value={firstName}
                    onChange={this.handleUserInput}
                    placeholder="First Name"
                  />
                  {formErrors.firstName.length > 0
                  && (
                  <p key={firstName} className="warning">
                    First Name {formErrors.firstName}
                  </p>
                  )}
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="form-control"
                    value={lastName}
                    onChange={this.handleUserInput}
                    placeholder="Last Name"
                  />
                  {formErrors.lastName.length > 0
                  && (
                  <p key={lastName} className="warning">
                    Last Name {formErrors.lastName}
                  </p>
                  )}
                </div> <br />
                <div className="col-md-6">

                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="form-control"
                    value={email}
                    onChange={this.handleUserInput}
                  />
                  {formErrors.email.length > 0
                  && (
                  <p key={email} className="warning">
                    Email {formErrors.email}
                  </p>
                  )}
                </div>
                <div className="col-md-6">

                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={this.handleUserInput}
                    placeholder="Password"
                  />
                  {formErrors.password.length > 0
                  && (
                  <p key={password} className="warning">
                    Password {formErrors.password}
                  </p>
                  )}
                </div> <br />
                <div className="col-md-6">

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
                  {formErrors.gender.length > 0
                  && (
                  <p key="gender" className="warning">
                    Gender {formErrors.gender}
                  </p>
                  )}
                </div>
              </div>
              <input
                type="submit"
                value="Submit"
                disabled={!formValid}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

RegistrationForm.propTypes = {
  history: PropTypes.func.isRequired,
};
export default withLayout(RegistrationForm);
