import * as React from "react";
import { exampleWorkers } from "../../exampleData/ExampleWorkers";

const UserContext = React.createContext();

export function useUserContext() {
  return React.useContext(UserContext);
}

export function UserContextProvider({ children }) {
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
    <UserContext.Provider value={{ userData, isLoggedIn, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
}
