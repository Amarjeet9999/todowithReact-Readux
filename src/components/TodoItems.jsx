/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  getTodoLoading,
  getTodoSuccess,
  getTodoError,
  deleteTodoLoading,
  deleteTodoSuccess,
  deleteTodoError,
  updateTodoLoading,
  updateTodoSuccess,
  updateTodoError,
} from "../Redux/Todos/action";
import axios from "axios";
import { TodoInput } from "./TodoInput";

export const Todo = () => {
  const history = useHistory();
  const {
    data: todos,
    isLoading,
    isError,
  } = useSelector((state) => state.todos.todos);

  // Getting Dispatch
  const dispatch = useDispatch();

  // Getting Data
  const getTodos = async () => {
    dispatch(getTodoLoading());
    try {
      const resp = await axios.get("http://localhost:3001/todos");
      dispatch(getTodoSuccess(resp.data));
    } catch (e) {
      dispatch(getTodoError(e.message));
    }
  };
  const handleDelete = async (id) => {
    dispatch(deleteTodoLoading());
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      // dispatch(getTodoSuccess());
      getTodos();
    } catch (e) {
      dispatch(deleteTodoError(e.message));
    }
  };

  React.useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <TodoInput getTodos={getTodos} />
      {isLoading ? (
        "Loading"
      ) : isError ? (
        "Error Occured"
      ) : (
        <div>
          {todos.map((e) => (
            <div
              key={e.id}
              style={{
                height: "25px",
                width: "300px",
                margin: "auto",
                padding: "25px 0",
                display: "flex",
                justifyContent: "space-around",
                border: "2px solid",
                marginTop: "10px",
                cursor: "pointer",
              }}>
              <List onClick={() => history.push(`/todo/${e.id}`)}>
                {e.title}
              </List>

              <Delete
                onClick={() => handleDelete(e.id)}
                className='material-icons'>
                delete
              </Delete>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const Delete = styled.div`
  cursor: "pointer";
  &:hover {
    color: red;
  }
`;

const List = styled.b`
  text-transform: capitalize;
  font-size: 25px;
`;
