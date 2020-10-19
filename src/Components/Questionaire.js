/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Question from "./Question";
import skill0Questionaire from "../Questionaire.json";
import skill1Questionaire from "../QuestionaireSkill1.json";
import skill2Questionaire from "../QuestionaireSkill2.json";

const skillLevels = ["Level 1", "Level 2", "Level 3"];

const initialState = {
  questionIndex: 0,
  isFalseLogin: false,
  quizTime: 600,
  questionCount: 0,
  IsQuizSubmitted: false,
  skillLevel: "",
  questionData: "",
  candidateDetails: [],
  candidateResponses: [],
  currentResponse: [],
  questionsAttempted: 0,
  candidateScore: 0,
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  password: "",
};
class Questionaire extends Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(localStorage.getItem("state"))
      ? JSON.parse(localStorage.getItem("state"))
      : initialState;
  }

  /**
   * set Questionaire according to the skill level
   */
  UNSAFE_componentWillMount() {
    this.setState({
      firstName: _.get(this.props, "location.state.firstName"),
      lastName: _.get(this.props, "location.state.lastName"),
      email: _.get(this.props, "location.state.email"),
      gender: _.get(this.props, "location.state.gender"),
      password: _.get(this.props, "location.state.password"),
    });
    const level = _.get(this.props, "location.state.skillLevel");

    let questionsd = [];
    if (level === skillLevels[0]) {
      questionsd = skill0Questionaire.questions;
    } else if (level === skillLevels[1]) {
      questionsd = skill1Questionaire.questions;
    } else {
      questionsd = skill2Questionaire.questions;
    }

    this.setState({
      skillLevel: level,
      questionData: questionsd,
      questionCount: questionsd.length,
    });
    this.timer = setInterval(() => {
      const newCount = this.state.quizTime - 1;
      this.setState({ quizTime: newCount >= 0 ? newCount : 0 });
      this.updateLocalStorage();
    }, 1000);
  }

  /**
   * Handle back button click
   */
  componentDidMount() {
    window.onpopstate = () => {
      this.props.history.push({
        pathname: "/LandingPage",
        state: { ...this.state },
      });
    };
  }

  /**
   * Reset Timer on quiz over
   */
  resetTimer = () => {
    this.setState({
      quizTime: 600,
    });
    this.updateLocalStorage();
  };

  /**
   * Display next question on questionaire
   */
  nextQuestion = () => {
    const isAnswerCorrect = JSON.stringify(this.state.currentResponse)
      == JSON.stringify(this.state.questionData[this.state.questionIndex].answer);
    const isQuestionAttempted = this.state.currentResponse.length > 0;
    this.state.candidateResponses.push({
      id: this.state.questionIndex,
      Question: this.state.questionData[this.state.questionIndex].question,
      Response: this.state.currentResponse,
      Answer: this.state.questionData[this.state.questionIndex].answer,
      IsAnswerCorrect: isAnswerCorrect,
      IsAttempted: isQuestionAttempted,
    });
    const questIndex = this.state.questionIndex + 1;
    this.clearResponse();
    if (this.state.questionIndex == this.state.questionCount - 1) {
      this.submitTest();
    } else {
      this.setState({
        questionIndex: questIndex,
      });
    }
    this.updateLocalStorage();
  };

  /**
   *Save the choice selected
   *
   * @param {string} event choice of question selected
   */
  choiceSelected = (event) => {
    if (this.state.currentResponse.includes(event.target.value)) {
      this.state.currentResponse.pop(event.target.value);
    }
    this.state.currentResponse.push(event.target.value);
    this.updateLocalStorage();
  };

  /**
   * Clear responses selected
   */
  clearResponse = () => {
    this.setState({
      currentResponse: [],
    });
    this.updateLocalStorage();
  };

  /**
   * Download JSON file of the Candidate Responses
   */
  downloadFile = async () => {
    const myData = this.state.candidateResponses;
    const fileName = "CandidateResponses";
    const json = JSON.stringify(myData);
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `${fileName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.updateLocalStorage();
  };

  /**
   * Submit candidate Responses
   */
  submitTest = () => {
    const { candidateResponses } = this.state;
    const correctAnswers = candidateResponses.filter(
      (c) => c.IsAnswerCorrect == true,
    ).length;
    const questionsAttempt = candidateResponses.filter(
      (c) => c.IsAttempted == true,
    ).length;
    this.setState(
      {
        candidateScore: correctAnswers,
        questionsAttempted: questionsAttempt,
        IsQuizSubmitted: true,
      },
      () => {
        this.resetTimer();
        this.downloadFile();

        this.props.history.push({
          pathname: "/SubmitTest",
          state: { ...this.state },
        });
      },
    );
    this.updateLocalStorage();
  };

  /**
   * Display Previous qestion in the questionaire
   */
  previousQuestion = () => {
    const { questionIndex } = this.state;
    this.state.candidateResponses.splice(questionIndex, 1);
    this.setState({
      questionIndex: questionIndex - 1,
    });
    this.updateLocalStorage();
  };

  /**
   * Update Local storage on state change
   */
  updateLocalStorage() {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  render() {
    return (
      this.state.isFalseLogin == false && (
        <Question
          questionId={this.state.questionIndex}
          questionText={
            this.state.questionData[this.state.questionIndex].question
          }
          options={this.state.questionData[this.state.questionIndex].options}
          questionCount={this.state.questionCount}
          onNext={this.nextQuestion}
          onPrevious={this.previousQuestion}
          onChange={this.choiceSelected}
          submitTest={this.submitTest}
          answer={this.state.currentResponse}
          clearResponse={this.clearResponse}
          isQuizSubmitted={this.state.IsQuizSubmitted}
          quizTime={this.state.quizTime}
        />
      )
    );
  }
}

Questionaire.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

export default Questionaire;
