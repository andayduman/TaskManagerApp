import {
  GET_TASKS,
  ADD_TASK,
  DELETE_TASK,
  SET_CURRENT,
  GET_CURRENT,
  UPDATE_TASKS,
  FILTER_TASKS,
  FITLER_TASKS,
  CLEAR_FILTER,
  CLEAR_TASKS,
  TASK_ERROR,
  UPDATE_TASK,
  CLEAR_CURRENT,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case CLEAR_TASKS:
      return {
        ...state,
        tasks: null,
        current: null,
        filtered: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_TASKS:
      return {
        ...state,
        filtered: state.tasks.filter((task) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return task.title.match(regex) || task.description.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case TASK_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
