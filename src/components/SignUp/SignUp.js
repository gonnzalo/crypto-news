import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import "./SignUp.css";

const SIGN_UP = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

const SignUp = ({ handleSignUp }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
              <form
                onSubmit={e => {
                  signUp({ variables: { username, email, password } });
                  e.preventDefault();
                }}
                className="form-container"
              >
                <label htmlFor="username" className="label-form">
                  Username
                  <input
                    name="username"
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    type="text"
                    placeholder="Full Name"
                    className="input-form"
                  />
                </label>

                <label htmlFor="email" className="label-form">
                  Email
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
                <input type="submit" value="SignUp" className="submit-form" />
              </form>
              {loading && <p>Loading...</p>}
              {error && <p>Error, Please try again</p>}
            </div>
          );
        }}
      </Mutation>
    </>
  );
};

export default SignUp;
