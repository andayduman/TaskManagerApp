import React, { Fragment, useContext } from "react";
import {
  Navbar,
  Nav,
  Container,
  NavLink,
  Text,
  Row,
  Col,
} from "react-bootstrap";
import AuthContext from "../context/auth/authContext";
const HomeNavbar = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <Navbar.Text style={{ color: "rgb(13,110,253)" }}>
        Hello {user && user.name}
      </Navbar.Text>
      <Nav.Link onClick={onLogout} href="#!">
        Logout
      </Nav.Link>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Nav.Link href="/about">About</Nav.Link>
      <Nav.Link href="/register">Register</Nav.Link>
      <Nav.Link href="/login">Login</Nav.Link>
    </Fragment>
  );

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Welcome to Task Manager</Navbar.Brand>
        <Nav className="me-auto" style={{ marginLeft: "60%" }}>
          {isAuthenticated ? authLinks : guestLinks}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default HomeNavbar;
