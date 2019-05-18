import React from "react";

const Login = () => {
  return (
    <div>
      <form>
        <label htmlFor="username">
          Username:
          <input id="username" type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
