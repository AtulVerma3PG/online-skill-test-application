/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { DropdownButton, Dropdown } from "react-bootstrap";
import _ from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";

const skillLevels = ["Level 1", "Level 2", "Level 3"];

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsLevelFilled: false,
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
    // history.pushState(null, null, this.props.location.href);
    // window.onpopstate = window.history.go(1);
    window.onpopstate = () => {
      this.props.history.push({
        pathname: "/LandingPage",
        state: this.state,
      });
    };
    this.setState({
      firstName: _.get(this.props, "location.state.firstName"),
      lastName: _.get(this.props, "location.state.lastName"),
      password: _.get(this.props, "location.state.password"),
      email: _.get(this.props, "location.state.email"),
      gender: _.get(this.props, "location.state.gender"),
      isRegistered: _.get(this.props, "location.state.isRegistered"),
    });
  }

  /**
   * Clear local storage and start questionaire
   */
  startTestHandler = () => {
    localStorage.clear();
    this.props.history.push({
      pathname: "/Questionaire",
      state: { ...this.state },
    });
  };

  /**
   * Handle skill level selected
   *
   * @param {string} eventKey Skill level selected
   * @param {*} event
   */
  handleSelect(eventKey, event) {
    this.setState({ skillLevel: eventKey, IsLevelFilled: true });
  }

  render() {
    return (
      <div>
        <div>
          <h1>Skill Examination</h1>
          <br />
          <h2>Examination Instructions</h2>
          <ul className="list-group">
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
        </div>
        <br />
        <br />
        <br />

        <div>
          <DropdownButton
            title={this.state.skillLevel}
            id="document-type"
            onSelect={this.handleSelect.bind(this)}
          >
            {skillLevels.map((opt, i) => (
              <Dropdown.Item as="button" eventKey={opt} key={opt}>
                {opt}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
        <br />
        <br />
        {this.state.IsLevelFilled && (
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
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default HomePage;
