import React from "react";

const IsUserLoggedIn = !!localStorage.getItem("x-token");

export const UserContext = React.createContext({
  IsUserLoggedIn
});
