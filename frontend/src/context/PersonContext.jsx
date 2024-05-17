import React, { useState } from "react";
import api from "../api/api";

const PersonContext = React.createContext();

export function usePersonContext() {
  return React.useContext(PersonContext);
}

export function PersonContextProvider({ children }) {
  const [userData, setUserData] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logIn = async (email, password) => {
    try {
      const res = await api.get("/person/login");
      if (res.data) {
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  };
  const logOut = () => {
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

  return (
    <PersonContext.Provider
      value={{ userData, isLoggedIn, logIn, logOut, getPersons, getPerson }}
    >
      {children}
    </PersonContext.Provider>
  );
}
