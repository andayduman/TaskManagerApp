import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/auth/authContext";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (
      error === "email is already associated with a user" ||
      error === "server error occured"
    ) {
      alert(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      alert("Please enter all fields");
    } else if (password !== password2) {
      alert("Passwords do not match");
    } else {
      register({
        name: name,
        email: email,
        password: password,
      });
    }
    console.log("Registration Submitted");
  };
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <h1>
            <span style={{ color: "rgb(13,110,253)" }}>Register</span> User
          </h1>
          <Form style={{ width: "30rem" }} onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
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
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="password2"
                value={password2}
                onChange={onChange}
                required
                minLength="6"
              />
            </Form.Group>
            <Button variant="primary" type="submit" value="register">
              Register
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Register;
