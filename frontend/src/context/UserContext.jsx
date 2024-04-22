import * as React from "react";

const UserContext = React.createContext();

export function useUserContext() {
  return React.useContext(UserContext);
}

export function UserContextProvider({ children }) {
  const [userData, setUserData] = React.useState();
  const [isLoggedIn, setIsLoggedIn] = React.useState();
  return (
    <UserContext.Provider value={{ userData, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
