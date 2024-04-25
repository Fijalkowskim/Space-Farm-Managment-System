import * as React from "react";
import { exampleUserData } from "../exampleData/ExampleUserData";
import { exampleCultivations } from "../exampleData/ExampleCultivations";

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
  const getAssignedCultivations = () => {
    if (!userData) return [];
    return exampleCultivations;
  };
  return (
    <UserContext.Provider
      value={{ userData, isLoggedIn, logIn, logOut, getAssignedCultivations }}
    >
      {children}
    </UserContext.Provider>
  );
}
