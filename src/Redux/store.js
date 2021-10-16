/** @format */

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { todosReducer } from "./Todos/reducer";
import { authReducer } from "./Auth/authReducer";
import Thunk from "redux-thunk";

// const middlewareOne = (store) => (next) => (action) => {
//   return typeof action === "function"
//     ? action(store.dispatch, store.getState)
//     : next(action);
// };

const rootReducer = combineReducers({ todos: todosReducer, auth: authReducer });

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(Thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
