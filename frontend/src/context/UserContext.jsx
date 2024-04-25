import * as React from "react";
import { exampleUserData } from "../exampleData/ExampleUserData";

const UserContext = React.createContext();

export function useUserContext() {
  return React.useContext(UserContext);
}

export function UserContextProvider({ children }) {
  const [userData, setUserData] = React.useState(exampleUserData);
  const [isLoggedIn, setIsLoggedIn] = React.useState();
  const logIn = (email, password) => {
    setIsLoggedIn(true);
    setUserData(exampleUserData);
  };
  const logOut = () => {
    setUserData(null);
    setIsLoggedIn(false);
  };
  return (
    <UserContext.Provider value={{ userData, isLoggedIn, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
}
