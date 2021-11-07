import React, { useReducer } from "react";
import axios from "axios";
import TaskContext from "./taskContext";
import taskReducer from "./taskReducer";
import {
  GET_TASKS,
  ADD_TASKS,
  DELETE_TASK,
  SET_CURRENT,
  GET_CURRENT,
  UPDATE_TASK,
  FILTER_TASKS,
  FITLER_TASKS,
  CLEAR_FILTER,
  TASK_ERROR,
  ADD_TASK,
  CLEAR_TASKS,
  CLEAR_CURRENT,
} from "../types";

const TaskState = (props) => {
  const initialState = {
    tasks: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  //GET TASK state method:
  const getTasks = async () => {
    try {
      const res = await axios.get("/api/tasks");
      dispatch({ type: GET_TASKS, payload: res.data });
    } catch (err) {
      dispatch({ type: TASK_ERROR, payload: err.response.msg });
    }
  };

  //ADD TASK state method:
  const addTask = async (task) => {
    // Need to configure the header that will post data to the database
    const config = {
      // Specifying the content type as JSON
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/tasks", task, config);
      dispatch({ type: ADD_TASK, payload: res.data });
    } catch (err) {
      dispatch({ type: TASK_ERROR, payload: err.response.msg });
    }
  };

  //DELETE TASK state method
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      dispatch({ type: DELETE_TASK, payload: id });
    } catch (err) {
      dispatch({ type: TASK_ERROR, payload: err.response.msg });
    }
  };

  //UPDATE TASK state method
  const updateTask = async (task) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`/api/tasks/${task._id}`, task, config);
      dispatch({ type: UPDATE_TASK, payload: res.data });
    } catch (err) {
      dispatch({ type: TASK_ERROR, payload: err.response.msg });
    }
  };

  //CLEAR TASKS state method
  const clearTasks = () => {
    dispatch({ type: CLEAR_TASKS });
  };

  //SET CURRENT state method
  const setCurrent = (task) => {
    dispatch({ type: SET_CURRENT, payload: task });
  };
  //CLEAR CURRENT state method
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //FILTER TASKS state method
  const filterTasks = (text) => {
    dispatch({ type: FILTER_TASKS, payload: text });
  };
  //CLEAR FILTER state method
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addTask,
        deleteTask,
        setCurrent,
        clearCurrent,
        updateTask,
        filterTasks,
        clearFilter,
        getTasks,
        // clearTasks,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
