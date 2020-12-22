import React from "react";
import { logout } from "./utils";
import check from "../assets/check.png";
/**
 *Show Candidate Score with details
 *
 * @param {object} props candidate Test details
 */
const SubmitTest = ({ location }) => {
  const { state } = location;
  logout();
  return (
    <div className="thankyou-page">
      <img src={check} alt="s" />
      <h4>Thanks You! </h4>
      <p>
        <b>Name :</b> {state.firstName} {state.lastName}
        <br />
        <b>Email :</b> {state.email}
        <br />
        <b>Questions Attempted : </b>
        <span className="number-score">{state.questionsAttempted} /{" "}
          {state.questionCount}
        </span>
        <br />
        <b>Score :</b> <span className="number-score">{state.candidateScore} / {state.questionCount}</span>
      </p>
    </div>
  );
};

SubmitTest.propTypes = {
  location: Object.isRequired,
};

export default SubmitTest;
