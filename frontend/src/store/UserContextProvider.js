import React from "react";
import User from "./user";

const UserContextProvider = (props) => {
  const obj = {
    userName: null,
  };
  return <User.Provider value={obj}>{props.children}</User.Provider>;
};

export default UserContextProvider;
