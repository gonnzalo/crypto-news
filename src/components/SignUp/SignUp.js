import React, { useState } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import LoadingProgress from "../LoadingProgress";

import "./SignUp.css";

const SIGN_UP = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

const SignUp = ({ handleSignUp, closeLogin, handleLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const mediaQuerySmall = useMediaQuery("(max-width:480px)");

  return (
    <>
      <Mutation mutation={SIGN_UP}>
        {(signUp, { loading, error, data, client }) => {
          if (data) {
            const { token } = data.signUp;
            localStorage.setItem("x-token", token);
            client.writeData({
              data: {
                isLoggedIn: true
              }
            });
            handleSignUp();
          }
          return (
            <div className="SignUp-container">
              <button
                type="button"
                className="submit-close"
                name="submit-close"
                onClick={closeLogin}
                aria-label="close"
              >
                x
              </button>
              <form
                onSubmit={e => {
                  signUp({ variables: { username, email, password } }).then(
                    () => window.location.reload()
                  );
                  e.preventDefault();
                }}
                className="form-container"
              >
                <label htmlFor="username" className="label-form">
                  {!mediaQuerySmall && "Username"}
                  <input
                    name="username"
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    type="text"
                    placeholder="Username"
                    className="input-form"
                  />
                </label>

                <label htmlFor="email" className="label-form">
                  {!mediaQuerySmall && "Email"}
                  <input
                    name="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="text"
                    placeholder="Email Address"
                    className="input-form"
                  />
                </label>

                <label htmlFor="password" className="label-form">
                  {!mediaQuerySmall && "Password"}
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
                <input
                  type="submit"
                  value="New Account"
                  className="submit-form"
                />
              </form>
              <span className="already-user">
                Already have an account?{" "}
                <button
                  type="button"
                  className="btn-form-link"
                  onClick={handleLogin}
                  aria-label="log in"
                >
                  {" "}
                  Log in
                </button>
              </span>
              {loading && <LoadingProgress />}
              {error && (
                <div className="error-users">
                  Error:{" "}
                  {error.graphQLErrors.map(({ message }, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <span key={i}>{message}</span>
                  ))}
                </div>
              )}
            </div>
          );
        }}
      </Mutation>
    </>
  );
};

SignUp.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  closeLogin: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired
};

export default SignUp;
