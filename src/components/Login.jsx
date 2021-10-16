/** @format */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { loginSuccess, loginError } from "../Redux/Auth/action";

export const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const token = useSelector((state) => state.auth.token);
  console.log(token);

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = { email, password };
    handleLogin(payload);
  };

  const handleLogin = ({ email, password }) => {
    if (email === "amarjeet" && password === "123321") {
      const action = loginSuccess("fakeToken");
      dispatch(action);
    } else {
      const action = loginError("wrong credentials");
      dispatch(action);
    }
  };

  if (token !== "") {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <>
        <h3>Login form</h3>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email'
          />
          <br />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
            type='password'
          />
          <br />
          <input type='submit' />
        </form>
      </>
    </div>
  );
};
