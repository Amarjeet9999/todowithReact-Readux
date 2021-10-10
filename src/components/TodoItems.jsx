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
    total,
    completed,
  } = useSelector((state) => state.todos.todos);

  // Getting Dispatch
  const dispatch = useDispatch();

  // Getting Data
  const getTodos = async () => {
    dispatch(getTodoLoading());
    try {
      const data = await axios.get("http://localhost:3001/todos");
      dispatch(
        getTodoSuccess({
          data: data.data,
          total: data.data.length,
          comp: data.data.filter((e) => e.status).length,
        })
      );
    } catch (e) {
      dispatch(getTodoError(e.message));
    }
  };
  const handleDelete = async (id) => {
    dispatch(deleteTodoLoading());
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);

      getTodos();
    } catch (e) {
      dispatch(deleteTodoError(e.message));
    }
  };

  const handleToggle = async (id) => {
    dispatch(updateTodoLoading());
    const data = await axios.get(`http://localhost:3001/todos/${id}`);
    try {
      await axios.patch(`http://localhost:3001/todos/${id}`, {
        status: !data.data.status,
      });
      // dispatch(updateTodoSuccess());
      getTodos();
    } catch (e) {
      dispatch(updateTodoError(e.message));
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
          <div>
            <h5>Total Todo : {total}</h5>
            <h5>Completed Todo : {todos.filter((e) => e.status).length}</h5>
          </div>

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
              <List
                style={{ width: "70%" }}
                onClick={() => history.push(`/todo/${e.id}`)}>
                {e.title}
              </List>

              <div
                style={{
                  width: "30%",
                  display: "flex",
                  justifyContent: "space-around",
                }}>
                <Delete
                  onClick={() => handleToggle(e.id)}
                  className='material-icons'>
                  {e.status ? "check_circle" : "check_circle_outline"}
                </Delete>
                <Delete
                  onClick={() => handleDelete(e.id)}
                  className='material-icons'>
                  delete
                </Delete>
              </div>
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
