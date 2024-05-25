import React, { useState } from "react";
import api from "../api/api";
import { exampleWorkers } from "../exampleData/ExampleWorkers";
import { CookiesProvider, useCookies } from "react-cookie";
import { Person } from "../models/Person";
const PersonContext = React.createContext();

export function usePersonContext() {
  return React.useContext(PersonContext);
}

export function PersonContextProvider({ children }) {
  const [userData, setUserData] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userCookie, setUserCookie, removeUserCookie] = useCookies(["user"]);

  const logIn = async (email, password) => {
    try {
      const res = await api.get(
        `/person/login?login=${email}&password=${password}`
      );
      if (res.data) {
        setUserDataAfterLogin(res.data);
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  };
  const logOut = () => {
    removeUserCookie("user", { path: "/" });
    setUserData(null);
    setIsLoggedIn(false);
  };
  //************ Get methods ************
  const getPersons = async () => {
    try {
      const res = await api.get("/person/");
      if (res.data) {
        return res.data.content;
      }
    } catch (err) {
      console.log(err);
    }
    return undefined;
  };
  const getPerson = async (id) => {
    try {
      const res = await api.get(`/person/${id}`);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
    return undefined;
  };
  const loginFromCookies = async () => {
    const storedUserData = userCookie["user"];
    if (storedUserData) {
      setUserDataAfterLogin(storedUserData);
      return true;
    }
    return false;
  };
  const setUserDataAfterLogin = (newUserData) => {
    const newPerson = new Person(
      newUserData.id,
      newUserData.name,
      newUserData.surname,
      newUserData.role,
      newUserData.cultivations
    );
    setUserCookie("user", newPerson, { path: "/" });
    setIsLoggedIn(true);
    setUserData(newPerson);
  };
  return (
    <PersonContext.Provider
      value={{
        userData,
        isLoggedIn,
        logIn,
        logOut,
        getPersons,
        getPerson,
        loginFromCookies,
      }}
    >
      {children}
    </PersonContext.Provider>
  );
}
