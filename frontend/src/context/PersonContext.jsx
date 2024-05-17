import * as React from "react";
import { exampleWorkers } from "../exampleData/ExampleWorkers";

const PersonContext = React.createContext();

export function usePersonContext() {
  return React.useContext(PersonContext);
}

export function PersonContextProvider({ children }) {
  const [userData, setUserData] = React.useState(exampleWorkers[0]);
  const [isLoggedIn, setIsLoggedIn] = React.useState();
  const logIn = (email, password) => {
    setIsLoggedIn(true);
    setUserData(exampleWorkers[0]);
  };
  const logOut = () => {
    setUserData(null);
    setIsLoggedIn(false);
  };

  return (
    <PersonContext.Provider value={{ userData, isLoggedIn, logIn, logOut }}>
      {children}
    </PersonContext.Provider>
  );
}
