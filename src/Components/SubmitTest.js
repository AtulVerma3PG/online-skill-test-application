/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from "react";
/**
 *Show Candidate Score with details
 *
 * @param {object} props candidate Test details
 */
// eslint-disable-next-line react/prop-types
const SubmitTest = ({ location }) => {
  return (
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
};

export default SubmitTest;
