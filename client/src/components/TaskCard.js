import React, { useContext } from "react";
import TaskContext from "../context/task/taskContext";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

const TaskCard = ({ task }) => {
  const taskContext = useContext(TaskContext);
  const { deleteTask, setCurrent, clearCurrent } = taskContext;

  const { _id, title, priority, date, description } = task;

  const onDelete = () => {
    deleteTask(_id);
    clearCurrent();
  };

  return (
    <Card style={{ width: "30rem", marginBottom: "2%" }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className={"mb-2 text-muted "}>
          Priority: {priority}
        </Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary" size="sm" onClick={onDelete}>
          Mark as Done
        </Button>{" "}
        <Button variant="secondary" size="sm" onClick={() => setCurrent(task)}>
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object.isRequired, // the 'task' prop can only take in a task object
};

export default TaskCard;
