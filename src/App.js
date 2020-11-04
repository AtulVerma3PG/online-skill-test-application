import React from "react";
import {
  BrowserRouter, Switch, Route,
} from "react-router-dom";
import RegistrationForm from "./Components/RegisterForm";
import "./App.css";
import HomePage from "./Components/HomePage";
import LandingPage from "./Components/LandingPage";
import Questionaire from "./Components/Questionaire";
import SubmitTest from "./Components/SubmitTest";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="content">
            <Switch>
              <Route path="/LandingPage" component={LandingPage} />
              <Route exact path="/" component={RegistrationForm} />
              <Route path="/Home" component={HomePage} />
              <Route path="/Questionaire" component={Questionaire} />
              <Route path="/SubmitTest" component={SubmitTest} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
