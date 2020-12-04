import React from "react";
import {
  BrowserRouter, Switch, Route,
} from "react-router-dom";
import RegistrationForm from "./Components/RegisterForm";
import "./App.css";
import HomePage from "./Components/HomePage";
import LandingPage from "./Components/LandingPage";
import SignIn from "./Components/SignIn";
import Questionaire from "./Components/Questionaire";
import SubmitTest from "./Components/SubmitTest";
import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";
import { isLogin } from "./Components/utils";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="content">
            <Switch>
              <Route path="/LandingPage" component={LandingPage} />
              <Route path="/SignIn" component={SignIn} />
              <Route exact path="/RegistrationForm" component={RegistrationForm} />
              <Route exact path="/" component={isLogin() ? HomePage : RegistrationForm} />
              <PublicRoute path="/Home" component={HomePage} />
              <PrivateRoute path="/Questionaire" component={Questionaire} />
              <Route path="/SubmitTest" component={SubmitTest} />
              <Route path="*" component={LandingPage} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
