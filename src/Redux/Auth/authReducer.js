/** @format */
import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_ERROR } from "./actionTypes";

const initState = {
  loading: false,
  error: false,
  token: "",
};

export const authReducer = (state = initState, { type, payload }) => {
  console.log(type);

  switch (type) {
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: payload,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default: {
      return { ...state };
    }
  }
};
