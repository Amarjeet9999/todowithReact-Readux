/** @format */

import { createStore, combineReducers } from "redux";
import { todosReducer } from "./Todos/reducer";
import { authReducer } from "./Auth/authReducer";

const rootReducer = combineReducers({ todos: todosReducer, auth: authReducer });

export const store = createStore(rootReducer);
