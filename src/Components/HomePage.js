import React, { Component } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import { testActive } from "./utils/index";
import "bootstrap/dist/css/bootstrap.min.css";

const skillLevels = ["Level 1", "Level 2", "Level 3"];

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsLevelFilled: false,
      IsAggreed: false,
      IsQuizSubmitted: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      isRegistered: false,
      skillLevel: "Select the skill level",
    };
  }

  /**
   * handling back button click and updating the state for the registration detailsS
   */
  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userDetails"));
    const { history } = this.props;
    if (!userData) {
      history.push("/");
    }
    this.setState({
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: userData.password,
      email: userData.email,
      gender: userData.gender,
      isRegistered: userData.isRegistered,
    });
  }

  /**
   * Handle skill level selected
   *
   * @param {string} eventKey Skill level selected
   * @param {*} event
   */
  handleSelect(eventKey) {
    this.setState({ skillLevel: eventKey, IsLevelFilled: true });
  }

  /**
   * Handle skill level selected
   *
   * @param {string} eventKey Skill level selected
   * @param {*} event
   */
  handleAgreement() {
    const { IsAggreed } = this.state;
    this.setState({ IsAggreed: !IsAggreed });
  }

  /**
   * Clear local storage and start questionaire
   */
  startTestHandler = () => {
    const { history } = this.props;
    localStorage.removeItem("state");
    testActive();
    history.push({
      pathname: "/Questionaire",
      state: { ...this.state },
    });
  };

  render() {
    const { IsLevelFilled, skillLevel, IsAggreed } = this.state;
    return (
      <div>
        <div className="home">
          <h1>Skill Examination</h1>
          <br />
          <ul className="list-group quizinstructions">
            <h2>Examination Instructions</h2>
            <br />
            <li className="list-group-item">
              A start button would start the test with specific time
            </li>
            <li className="list-group-item">
              Candidates can view one question per page and can navigate
              next/previous.
            </li>
            <li className="list-group-item">
              Question may be a single or multiple choice.
            </li>
            <li className="list-group-item">
              Test would finish automatically after the timer ends.
            </li>
            <li className="list-group-item">
              The time limit for the test is 10 minutes.
            </li>
          </ul>
          <div>
            <DropdownButton
              title={skillLevel}
              id="selectLevel"
              className="select"
              onSelect={(eventKey) => this.handleSelect(eventKey)}
            >
              {skillLevels.map((opt) => (
                <Dropdown.Item as="button" eventKey={opt} key={opt}>
                  {opt}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <div className="checkbox">
              <label
                className="checkbox-inline"
                htmlFor="{choice}"
                style={{ fontWeight: "bold" }}
              >
                <input
                  type="checkbox"
                  value="agreement"
                  onChange={() => this.handleAgreement()}
                />
                I agree to the Terms and Conditions
              </label>
              <br />
            </div>
          </div>
          {IsLevelFilled && IsAggreed && (
          <div>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={this.startTestHandler}
            >
              Start Test
            </button>
          </div>
          )}
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.func.isRequired,
};

export default HomePage;
