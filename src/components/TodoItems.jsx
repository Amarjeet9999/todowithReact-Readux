/** @format */

import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import {
  deleteTodoLoading,
  deleteTodoSuccess,
  deleteTodoError,
  updateTodoLoading,
  updateTodoSuccess,
  updateTodoError,
  getTodo,
} from "../Redux/Todos/action";
import { TodoInput } from "./TodoInput";

export const Todo = () => {
  const history = useHistory();
  const {
    data: todos,
    isLoading,
    isError,
    total,
    comp,
  } = useSelector((state) => state.todos.todos);

  const token = useSelector((state) => state.auth.token);
  console.log(token);

  // Getting Dispatch
  const dispatch = useDispatch();

  // Getting Data
  const getTodos = async () => {
    dispatch(getTodo());
  };

  const handleDelete = async (id) => {
    dispatch(deleteTodoLoading());
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      dispatch(deleteTodoSuccess());
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
      dispatch(updateTodoSuccess());
      getTodos();
    } catch (e) {
      dispatch(updateTodoError(e.message));
    }
  };

  React.useEffect(() => {
    getTodos();
  }, []);

  if (token === "") {
    return <Redirect to='/login' />;
  }

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
            <h5>Completed Todo : {comp}</h5>
          </div>

          {todos?.map((e) => (
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
