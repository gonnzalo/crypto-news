import React, { useState } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import LoadingProgress from "../LoadingProgress";

import "./Login.css";

const SIGN_IN = gql`
  mutation($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;

const Login = ({ handleLogin, closeLogin, handleSignUp }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Mutation mutation={SIGN_IN}>
        {(signIn, { loading, error, data }) => {
          if (data) {
            const { token } = data.signIn;
            localStorage.setItem("x-token", token);
            handleLogin();
            window.location.reload();
          }
          return (
            <div className="login-container">
              <button
                type="button"
                className="submit-close"
                name="submit-close"
                onClick={closeLogin}
              >
                x
              </button>
              <form
                onSubmit={e => {
                  signIn({ variables: { login, password } });
                  e.preventDefault();
                }}
                className="form-container"
              >
                <label htmlFor="login" className="label-form">
                  User
                  <input
                    name="login"
                    id="login"
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                    type="text"
                    placeholder="Username or Email"
                    className="input-form"
                  />
                </label>

                <label htmlFor="password" className="label-form">
                  Password
                  <input
                    name="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    autoComplete="on"
                    className="input-form"
                  />
                </label>
                <input type="submit" value="Sign in" className="submit-form" />
              </form>
              <span className="already-user">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="btn-form-link"
                  onClick={handleSignUp}
                >
                  {" "}
                  New Account
                </button>
              </span>
              {loading && <LoadingProgress />}
              {error && <p>Error, Please try again</p>}
            </div>
          );
        }}
      </Mutation>
    </>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  closeLogin: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired
};

export default Login;
