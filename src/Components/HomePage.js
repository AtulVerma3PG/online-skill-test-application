import React, { Component } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import _ from "lodash";
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
    const { history } = this.props;
    window.onpopstate = () => {
      history.push({
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
    const { history } = this.props;
    localStorage.clear();
    history.push({
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

  render() {
    const { IsLevelFilled, skillLevel, IsAggreed } = this.state;
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
            title={skillLevel}
            id="selectLevel"
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
        <br />
        <br />
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
    );
  }
}

HomePage.propTypes = {
  history: Object.isRequired,
};

export default HomePage;
