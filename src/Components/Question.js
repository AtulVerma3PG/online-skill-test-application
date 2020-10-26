import React from "react";
import "./Css/Question.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
/**
 * This function is responsible to show the questions on online test
 *
 * @param {object} props Details of the question to show
 *
 * @returns {object} question to be displayed
 */
const question = (props) => {
  const { quizTime } = props;
  let second = quizTime % 60;
  let minute = Math.floor(quizTime / 60);
  minute = minute.toString().length === 1 ? `0${minute}` : minute;
  second = second.toString().length === 1 ? `0${second}` : second;
  const { submitTest } = props;
  /**
   * Submit test on timer finish
   */
  if (second === "00" && minute === "00") {
    submitTest();
  }
  return (
    <div className="container">
      <div className="Countdown-time">
        Timer :-
        {" "}
        {minute}
        {" "}
        :
        {" "}
        {second}
      </div>
      <>
        <h3 id="question">
          Question
          {" "}
          {props.questionId}
          {" "}
          :
          {" "}
          {props.questionText}
        </h3>
        <div id="altcontainer">
          <div className="radio">
            {props.options.map((choice) => (
              <div key={choice}>
                <label className="radio-inline" htmlFor="{choice}">
                  <input
                    type="checkbox"
                    value={choice}
                    key={choice}
                    checked={props.answer.includes(choice)}
                    onChange={(e) => props.onChange(e)}
                  />
                  {choice}
                </label>
                <br />
              </div>
            ))}
          </div>
        </div>
      </>
      {props.questionId !== 0 && (
        <Button
          variant="info"
          onClick={props.onPrevious}
          className="questionaireButton"
        >
          Previous
        </Button>
      )}
      {props.answer.length !== 0 && (
        <Button
          variant="info"
          onClick={props.clearResponse}
          className="questionaireButton"
        >
          Clear Responses
        </Button>
      )}
      {props.questionId < props.questionCount - 1 && (
        <Button
          variant="info"
          className="questionaireButton"
          onClick={props.onNext}
        >
          Next
        </Button>
      )}
      {props.questionId === props.questionCount - 1 && (
        <Button
          variant="info"
          id="submitTest"
          onClick={props.onNext}
          className="questionaireButton"
        >
          Submit Test
        </Button>
      )}
    </div>
  );
};

export default question;
