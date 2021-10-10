/** @format */

import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import {
  deleteTodoLoading,
  deleteTodoError,
  updateTodoLoading,
  updateTodoError,
} from "../Redux/Todos/action";

export const SingleTodo = () => {
  const [edit, setEdit] = React.useState(true);
  const [update, setUpdate] = React.useState("");
  const [single, setSingle] = React.useState("");
  const { id } = useParams();
  const history = useHistory();

  const dispatch = useDispatch();

  const getTodo = async () => {
    let data = await axios.get(`http://localhost:3001/todos/${id}`);
    setSingle(data.data);
  };

  React.useEffect(() => {
    getTodo();
  }, []);

  const handleDelete = async (id) => {
    dispatch(deleteTodoLoading());
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      history.push("/");
    } catch (e) {
      dispatch(deleteTodoError(e.message));
    }
  };

  const handleUpdate = async (id) => {
    dispatch(updateTodoLoading());

    try {
      await axios.patch(`http://localhost:3001/todos/${id}`, {
        title: update,
      });
      getTodo();
      setEdit(true);
    } catch (e) {
      dispatch(updateTodoError(e.message));
    }
  };

  const handleUpdateStatus = async (id) => {
    dispatch(updateTodoLoading());
    try {
      await axios.patch(`http://localhost:3001/todos/${id}`, {
        status: !single.status,
      });
      getTodo();
      setEdit(true);
    } catch (e) {
      dispatch(updateTodoError(e.message));
    }
  };

  return (
    <>
      <h3>EDIT OR DELETE YOUR TODO</h3>
      {single ? (
        <>
          <div
            style={{
              border: "1px solid red",

              width: "300px",
              margin: "50px auto",
            }}>
            <List>
              {edit ? (
                <p>{single.title}</p>
              ) : (
                <>
                  <input
                    value={update}
                    onChange={(e) => setUpdate(e.target.value)}
                    type='text'
                    placeholder='edit'
                  />
                  <button onClick={() => handleUpdate(single.id)}>
                    Change
                  </button>
                </>
              )}
            </List>
            <TodoData>
              <b>{single.status ? "Done" : "Not Done"}</b>
              <button onClick={() => handleUpdateStatus(single.id)}>
                {!single.status ? "Done" : "Not Done"}
              </button>
              <button onClick={() => setEdit(!edit)}>Edit</button>
              <button onClick={() => handleDelete(single.id)}>Delete</button>
            </TodoData>
          </div>
          <button onClick={() => history.push("/")}>Go Back</button>
        </>
      ) : (
        "...loading"
      )}
    </>
  );
};

const TodoData = styled.div`
  display: flex;
  height: 50px;
  & b {
    width: 50%;
    margin: auto;
  }
  & button {
    width: 25%;
    cursor: "pointer";
    background: yellowgreen;
  }
`;

const List = styled.b`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  & p {
    text-transform: capitalize;
    font-size: 25px;
  }
  & input {
    text-transform: capitalize;
    font-size: 20px;
    width: 60%;
    padding: 0 10px;
  }
  & button {
    text-transform: capitalize;
    font-size: 20px;
    width: 40%;
  }
`;
