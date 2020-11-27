import React from "react";
import { logout } from "./utils";
/**
 *Show Candidate Score with details
 *
 * @param {object} props candidate Test details
 */
const SubmitTest = ({ location }) => {
  const { state } = location;
  console.log(state);
  logout();
  return (
    <div>
      <h4>Thanks for you Response.</h4>
      <p>
        Name : {state.firstName} {state.lastName}
        <br />
        Email : {state.email}
        <br />
        Questions Attempted : {state.questionsAttempted} /{" "}
        {state.questionCount}
        <br />
        Score : {state.candidateScore} / {state.questionCount}
      </p>
    </div>
  );
};

SubmitTest.propTypes = {
  location: Object.isRequired,
};

export default SubmitTest;
