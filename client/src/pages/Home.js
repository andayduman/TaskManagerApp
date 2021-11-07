import React, { Fragment, useContext, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import Tasks from "../components/Tasks";
import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";
import { Col, Container, Row } from "react-bootstrap";
import AuthContext from "../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Container>
        <Row style={{ padding: "2%" }}>
          <Col>
            <TaskFilter />
            <Tasks />
          </Col>
          <Col>
            <TaskForm />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Home;
