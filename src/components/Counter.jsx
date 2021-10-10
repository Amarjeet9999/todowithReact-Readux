/** @format */

import React from "react";
import { addCount, subCount } from "../Redux/Todos/action";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const Counter = () => {
  const counter = useSelector((state) => state.todos.counter);

  // Getting Dispatcher
  const dispatch = useDispatch();

  const addCounter = () => {
    dispatch(addCount(1));
  };

  const reduceCount = () => {
    dispatch(subCount(1));
  };

  return (
    <>
      <h3>Counter: {counter}</h3>
      <button onClick={addCounter}>Add</button>
      <button onClick={reduceCount}>Reduce</button>
    </>
  );
};
