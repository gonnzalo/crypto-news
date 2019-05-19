import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const SIGN_UP = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Mutation mutation={SIGN_UP}>
      {(signUp, { loading, error, data }) => {
        if (data) {
          const { token } = data.signUp;
          localStorage.setItem("x-token", token);
        }
        return (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                signUp({ variables: { username, email, password } });
              }}
            >
              <input
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                type="text"
                placeholder="Full Name"
              />
              <input
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="text"
                placeholder="Email Address"
              />
              <input
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <input type="submit" value="Submit" />
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error, Please try again</p>}
          </div>
        );
      }}
    </Mutation>
  );
};

export default Login;
