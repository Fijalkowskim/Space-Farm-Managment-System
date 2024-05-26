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
      const res = await api.get("/person");
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
  const getResponsibleWorkers = async (cultivationId) => {
    try {
      const res = await api.get(`/responsible/${cultivationId}`);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
    return undefined;
  };
  //************ Put methods ************
  const addPerson = async (personCreateRequest) => {
    if (!userData) return false;
    try {
      const res = await api.put(`?userID=${userData.id}`, personCreateRequest);
      if (res.data) {
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  };
  const addResponsiblePerson = async (personId, cultivationId) => {
    if (!userData) return false;
    try {
      //todo
      const res = await api.put(`?userID=${userData.id}`);
      if (res.data) {
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  };
  //************ User managment methods ************
  const loginFromCookies = async () => {
    const storedUserData = userCookie["user"];
    if (storedUserData) {
      setUserDataAfterLogin(storedUserData);
      return true;
    }
    return false;
  };
  const setUserDataAfterLogin = (newUserData) => {
    const newPerson = userFromResponse(newUserData);
    setUserCookie("user", newPerson, {
      path: "/",
    });
    setIsLoggedIn(true);
    setUserData(newPerson);
  };
  const userFromResponse = (userResponse) => {
    return new Person(
      userResponse.id,
      userResponse.name,
      userResponse.surname,
      userResponse.role,
      userResponse.cultivations
    );
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
        getResponsibleWorkers,
        addPerson,
      }}
    >
      {children}
    </PersonContext.Provider>
  );
}
