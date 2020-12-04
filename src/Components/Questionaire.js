import React, { Component } from "react";
import _ from "lodash";
import Question from "./Question";
import { logout } from "./utils/index";
import skill0Questionaire from "../Questionaire.json";
import skill1Questionaire from "../QuestionaireSkill1.json";
import skill2Questionaire from "../QuestionaireSkill2.json";

const skillLevels = ["Level 1", "Level 2", "Level 3"];

let initialState = {
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
    this.setInitialState();
    this.state = JSON.parse(localStorage.getItem("state"))
      ? JSON.parse(localStorage.getItem("state"))
      : initialState;
    this.updateLocalStorage();
  }

  componentDidMount() {
    const { history } = this.props;
    this.timer = setInterval(() => {
      // eslint-disable-next-line react/destructuring-assignment
      const newCount = this.state.quizTime - 1;
      this.setState({ quizTime: newCount >= 0 ? newCount : 0 });
      this.updateLocalStorage();
    }, 1000);
    this.updateLocalStorage();
    window.addEventListener("popstate", () => {
      history.push("/Questionaire");
    });
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
    const {
      currentResponse, questionIndex, questionData, candidateResponses,
    } = this.state;
    const isAnswerCorrect = JSON.stringify(currentResponse)
      == JSON.stringify(questionData[questionIndex].answer);
    const isQuestionAttempted = currentResponse.length > 0;
    candidateResponses.push({
      id: questionIndex,
      Question: questionData[questionIndex].question,
      Response: currentResponse,
      Answer: questionData[questionIndex].answer,
      IsAnswerCorrect: isAnswerCorrect,
      IsAttempted: isQuestionAttempted,
    });
    const questIndex = questionIndex + 1;
    this.clearResponse();
    const questionResponse = candidateResponses.filter((a) => a.id == questIndex);
    let response = [];
    if (questionResponse.length !== 0) {
      response = questionResponse[0].Response;
    }
    this.setState({
      questionIndex: questIndex,
      currentResponse: response,
    }, () => this.updateLocalStorage());
  };

  /**
   *Save the choice selected
   *
   * @param {string} event choice of question selected
   */
  choiceSelected = (event) => {
    const { currentResponse } = this.state;
    if (currentResponse.includes(event)) {
      currentResponse.splice(currentResponse.indexOf(event), 1);
    } else {
      currentResponse.push(event);
    }
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
    const { candidateResponses } = this.state;
    const myData = candidateResponses;
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
    const { history } = this.props;
    const correctAnswers = candidateResponses.filter(
      (c) => c.IsAnswerCorrect == true,
    ).length;
    const questionsAttempt = candidateResponses.filter(
      (c) => c.IsAttempted == true,
    ).length;
    logout();
    this.setState(
      {
        candidateScore: correctAnswers,
        questionsAttempted: questionsAttempt,
        IsQuizSubmitted: true,
      },
      () => {
        this.resetTimer();
        this.downloadFile();
        history.push({
          pathname: "/SubmitTest",
          state: { ...this.state },
        });
      },
    );
  };

  /**
   * Display Previous qestion in the questionaire
   */
  previousQuestion = () => {
    const { questionIndex, candidateResponses } = this.state;
    const questionResponse = candidateResponses.filter((a) => a.id == questionIndex - 1);
    let response = [];
    if (questionResponse.length !== 0) {
      response = questionResponse[0].Response;
      candidateResponses.splice(questionIndex - 1, 1);
    } else {
      candidateResponses.splice(questionIndex - 1, 1);
    }
    this.setState({
      questionIndex: questionIndex - 1,
      currentResponse: response,
    }, () => this.updateLocalStorage());
  };

setQuestion = (event) => {
  const { candidateResponses } = this.state;
  const questionResponse = candidateResponses.filter((a) => a.id == event - 1);
  let response = [];
  if (questionResponse.length !== 0) {
    response = questionResponse[0].Response;
    candidateResponses.splice(event - 1, 1);
  }
  this.setState({
    questionIndex: event - 1,
    currentResponse: response,
  }, () => this.updateLocalStorage());
}

setInitialState() {
  if (!JSON.parse(localStorage.getItem("state"))) {
    const userData = JSON.parse(localStorage.getItem("userDetails"));
    const level = _.get(this.props, "location.state.skillLevel");
    let questionsd = [];
    if (level === skillLevels[0]) {
      questionsd = skill0Questionaire.questions;
    } else if (level === skillLevels[1]) {
      questionsd = skill1Questionaire.questions;
    } else {
      questionsd = skill2Questionaire.questions;
    }
    initialState = {
      skillLevel: level,
      questionData: questionsd,
      questionCount: questionsd.length,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: userData.password,
      email: userData.email,
      gender: userData.gender,
      isRegistered: userData.isRegistered,
      questionIndex: 0,
      isFalseLogin: false,
      quizTime: 600,
      IsQuizSubmitted: false,
      candidateDetails: [],
      candidateResponses: [],
      currentResponse: [],
      questionsAttempted: 0,
      candidateScore: 0,
    };
  }
}

/**
   * Update Local storage on state change
   */
updateLocalStorage() {
  localStorage.setItem("state", JSON.stringify(this.state));
}

render() {
  const {
    questionIndex, questionData, questionCount, IsQuizSubmitted, quizTime, currentResponse,
  } = this.state;
  return (
    <Question
      questionId={questionIndex}
      questionText={
            questionData[questionIndex].question
          }
      options={questionData[questionIndex].options}
      questionCount={questionCount}
      onNext={this.nextQuestion}
      onPrevious={this.previousQuestion}
      onChange={this.choiceSelected}
      submitTest={this.submitTest}
      answer={currentResponse}
      setQuestion={this.setQuestion}
      clearResponse={this.clearResponse}
      isQuizSubmitted={IsQuizSubmitted}
      quizTime={quizTime}
    />

  );
}
}

Questionaire.propTypes = {
  history: Object.isRequired,
};

export default Questionaire;
