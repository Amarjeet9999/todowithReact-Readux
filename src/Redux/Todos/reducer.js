/** @format */

import {
  ADD_COUNTER,
  REDUCE_COUNTER,
  // ADD_TODO,
  ADD_TODO_LOADING,
  ADD_TODO_SUCCESS,
  ADD_TODO_ERROR,
  GET_TODO_ERROR,
  GET_TODO_LOADING,
  GET_TODO_SUCCESS,
  DELETE_TODO_LOADING,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR,
  UPDATE_TODO_LOADING,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_ERROR,
} from "./actionTypes";

const initState = {
  counter: 0,
  todos: {
    isLoading: false,
    isError: false,
    total: 0,
    comp: 0,
    data: [],
  },
};

export const todosReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case ADD_COUNTER:
      return {
        ...state,
        counter: state.counter + payload,
      };
    case REDUCE_COUNTER:
      return {
        ...state,
        counter: state.counter - payload,
      };

    // React Live Class - 3

    // Posting todo
    case ADD_TODO_LOADING:
      return {
        ...state,
        todos: {
          ...state.todos,
          isLoading: true,
        },
      };

    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: {
          ...state.todos,
          isLoading: false,
          total: payload.total,
          comp: payload.comp,
        },
      };

    case ADD_TODO_ERROR:
      return {
        ...state,
        todos: {
          ...state.todos,
          isError: true,
        },
      };

    // Get Todo
    case GET_TODO_LOADING:
      return {
        ...state,
        todos: {
          ...state.todos,
          isLoading: true,
        },
      };

    case GET_TODO_SUCCESS:
      return {
        ...state,
        todos: {
          ...state.todos,
          isLoading: false,
          comp: payload.comp,
          total: payload.total,
          data: [...payload.data],
        },
      };

    case GET_TODO_ERROR:
      return {
        ...state,
        todos: {
          ...state.todos,
          isError: true,
        },
      };

    // UPDATE TODOS

    case UPDATE_TODO_LOADING:
      return {
        ...state,
        todos: {
          ...state.todos,
          isLoading: true,
        },
      };
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todos: {
          ...state.todos,
          isLoading: false,
          // data: [...payload],
        },
      };

    case UPDATE_TODO_ERROR:
      return {
        ...state,
        todos: {
          ...state.todos,
          isError: true,
        },
      };

    // DELETE TODO

    case DELETE_TODO_LOADING:
      return {
        ...state,
        todos: {
          ...state.todos,
          isLoading: true,
        },
      };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: {
          ...state.todos,
          isLoading: false,
          // data: [...payload],
        },
      };

    case DELETE_TODO_ERROR:
      return {
        ...state,
        todos: {
          ...state.todos,
          isError: true,
        },
      };

    default:
      return state;
  }
};
