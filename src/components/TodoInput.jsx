/** @format */

import React from "react";
import { useDispatch } from "react-redux";
import {
  addTodoSuccess,
  addTodoLoading,
  addTodoError,
} from "../Redux/Todos/action";
import axios from "axios";

export const TodoInput = ({ getTodos }) => {
  const [text, setText] = React.useState("");

  // Getting Dispatch
  const dispatch = useDispatch();
  // Posting the Data
  const addTodoData = async () => {
    dispatch(addTodoLoading());
    try {
      const resp = await axios.post("http://localhost:3001/todos", {
        status: false,
        title: text,
      });
      dispatch(addTodoSuccess(resp.data));
      getTodos();
      setText("");
    } catch (e) {
      dispatch(addTodoError(e.message));
    }
  };
  
  return (
    <>
      <h3>TODO APP</h3>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type='text'
        placeholder='Add tasks'
      />
      <button onClick={addTodoData}>Add Todo</button>
    </>
  );
};
