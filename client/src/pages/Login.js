import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/auth/authContext";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "invalid credentials") {
      alert(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Please fill in all fields", "danger");
    } else {
      login({
        email: email,
        password: password,
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <h1>
            <span style={{ color: "rgb(13,110,253)" }}>Login</span> User
          </h1>
          <Form style={{ width: "30rem" }} onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                minLength="6"
              />
            </Form.Group>
            <Button variant="primary" type="submit" value="login">
              Login
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Login;
