import React, { Fragment, useContext, useEffect } from "react";
import TaskCard from "./TaskCard";
import TaskContext from "../context/task/taskContext";

const Tasks = () => {
  // Initializing our context for task components below
  const taskContext = useContext(TaskContext);
  const { tasks, current, filtered, error, getTasks } = taskContext;

  useEffect(() => {
    getTasks();
    //eslint-disable-next-line
  }, []);

  if (tasks !== null && tasks.length === 0) {
    return <h3>No Tasks Left to Complete!</h3>;
  }

  return (
    <Fragment>
      {tasks !== null ? (
        filtered !== null ? (
          filtered.map((task) => <TaskCard key={task._id} task={task} />)
        ) : (
          tasks.map((task) => <TaskCard key={task._id} task={task} />)
        )
      ) : (
        <h3>Loading...</h3>
      )}
    </Fragment>
  );
};

export default Tasks;
