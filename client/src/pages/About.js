import React from "react";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <div>
      <Container>
        <h1>About this app</h1>
        <p>
          This is a full stack MERN app for keeping track of tasks to be
          completed
        </p>
        <p>
          <strong>Version: </strong>1.0.0
        </p>
      </Container>
    </div>
  );
};

export default About;
