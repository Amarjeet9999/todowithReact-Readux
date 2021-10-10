/** @format */

import "./App.css";

import React from "react";
import { Counter } from "./components/Counter";
import { Todo } from "./components/TodoItems";
import { SingleTodo } from "./components/SingleTodo";
import { Switch, Route } from "react-router";

export default function App() {
  const [state, setState] = React.useState(false);
  return (
    <div className='App'>
      <Switch>
        <Route path='/' exact>
          <button onClick={() => setState(!state)}>
            {state ? "SWITCH TODO APP" : "SWITCH Counter"}
          </button>
          {state ? <Counter /> : <Todo />}
        </Route>
        <Route path='/todo/:id'>
          <SingleTodo />
        </Route>
        <Route>
          <h1>404 Not found</h1>
        </Route>
      </Switch>
    </div>
  );
}
