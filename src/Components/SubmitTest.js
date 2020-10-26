import React from "react";
/**
 *Show Candidate Score with details
 *
 * @param {object} props candidate Test details
 */
const SubmitTest = ({ location }) => (
  <div>
    <h4>Thanks for you Response.</h4>
    <p>
      Name : {location.state.firstName} {location.state.lastName}
      <br />
      Email : {location.state.email}
      <br />
      Questions Attempted : {location.state.questionsAttempted} /{" "}
      {location.state.questionCount}
      <br />
      Score : {location.state.candidateScore} / {location.state.questionCount}
    </p>
  </div>
);

SubmitTest.propTypes = {
  location: Object.isRequired,
};

export default SubmitTest;
