import * as React from "react";

const UserContext = React.createContext();

function UserContextProvider({ children }) {
  const [userData, setUserData] = React.useState();
  return (
    <CountContext.Provider value={userData}>{children}</CountContext.Provider>
  );
}

export { CountProvider };
