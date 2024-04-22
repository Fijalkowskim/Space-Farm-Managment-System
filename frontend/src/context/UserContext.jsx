import * as React from "react";

const UserContext = React.createContext();

export function useUserContext() {
  return React.useContext(UserContext);
}

export function UserContextProvider({ children }) {
  const [userData, setUserData] = React.useState();
  const [isLoggedIn, setIsLoggedIn] = React.useState();
  const logIn = (email, password) => {
    setIsLoggedIn(true);
  };
  return (
    <UserContext.Provider value={{ userData, isLoggedIn, logIn }}>
      {children}
    </UserContext.Provider>
  );
}
