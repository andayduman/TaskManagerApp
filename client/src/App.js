import React, { Fragment } from "react";
import HomeNavbar from "./components/HomeNavbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TaskState from "./context/task/TaskState";
import AuthState from "./context/auth/AuthState";
import axios from "axios";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./routing/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <TaskState>
        <Router>
          <Fragment>
            <HomeNavbar />
            <Container>
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </Container>
          </Fragment>
        </Router>
      </TaskState>
    </AuthState>
  );
};

export default App;
