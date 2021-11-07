import React, { useContext, useEffect, useRef } from "react";
import TaskContext from "../context/task/taskContext";
import { Form } from "react-bootstrap";

const TaskFilter = () => {
  const taskContext = useContext(TaskContext);

  const { filterTasks, clearFilter, filtered } = taskContext;

  const text = useRef();

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterTasks(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <Form style={{ width: "30rem" }}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control
          ref={text}
          type="text"
          placeholder="Filter Tasks"
          name="filter"
          onChange={onChange}
        />
      </Form.Group>
    </Form>
  );
};

export default TaskFilter;
