import React, { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import TaskContext from "../context/task/taskContext";

const TaskForm = () => {
  const taskContext = useContext(TaskContext);

  const { addTask, current, clearCurrent, updateTask } = taskContext;

  useEffect(() => {
    if (current !== null) {
      setTask(current);
    } else {
      setTask({
        title: "",
        priority: 1,
        description: "",
      });
    }
  }, [taskContext, current]);

  const [task, setTask] = useState({
    title: "",
    priority: 1,
    description: "",
  });
  const { title, priority, description } = task;

  const onChange = (e) => setTask({ ...task, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addTask(task);
    } else {
      updateTask(task);
    }
    setTask({
      title: "",
      priority: 1,
      description: "",
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <Form style={{ width: "30rem" }} onSubmit={onSubmit}>
      {current !== null ? <h1>Edit Task Info</h1> : <h1>Add New Task</h1>}
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Title</Form.Label>
        <br />
        <Form.Text className="text-muted">Please Enter a Title.</Form.Text>
        <Form.Control
          type="text"
          placeholder="Add a Title"
          name="title"
          value={title}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Priority</Form.Label>
        <br />
        <Form.Text className="text-muted">Please Enter a Number.</Form.Text>
        <Form.Control
          type="number"
          placeholder="1"
          name="priority"
          value={priority}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <br />
        <Form.Text className="text-muted">
          Please Enter a Description.
        </Form.Text>
        <Form.Control
          type="text"
          placeholder="Add a Description"
          name="description"
          value={description}
          onChange={onChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" value="Submit">
        {current !== null ? "Submit Changes" : "Add New Task"}
      </Button>{" "}
      {current && (
        <Button
          variant="secondary"
          type="submit"
          value="Clear"
          onClick={clearAll}
        >
          Clear
        </Button>
      )}
    </Form>
  );
};

export default TaskForm;
