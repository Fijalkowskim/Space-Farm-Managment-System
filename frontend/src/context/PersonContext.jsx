import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useCookies } from "react-cookie";
import { Person } from "../models/Person";
import { usePopupContext } from "./general/PopupContext";
const PersonContext = React.createContext();

export function usePersonContext() {
  return React.useContext(PersonContext);
}

export function PersonContextProvider({ children }) {
  const [userData, setUserData] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const { logError } = usePopupContext();
  const [userCookie, setUserCookie, removeUserCookie] = useCookies(["user"]);

  useEffect(() => {
    loginFromCookies();
  }, []);

  const logIn = async (email, password) => {
    setIsPending(true);
    try {
      const res = await api.get(
        `/person/login?login=${email}&password=${password}`
      );
      if (res.data) {
        setIsPending(false);
        setUserDataAfterLogin(res.data);
        return true;
      }
    } catch (err) {
      logError(err);
    }
    setIsPending(false);
    return false;
  };
  const logOut = () => {
    removeUserCookie("user", { path: "/" });
    setUserData(null);
    setIsLoggedIn(false);
    setIsPending(false);
  };
  //************ Get methods ************
  const getPersons = async () => {
    try {
      const res = await api.get("/person");
      if (res.data) {
        return res.data.content;
      }
    } catch (err) {
      logError(err);
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
      logError(err);
    }
    return undefined;
  };
  const getResponsibleWorkers = async (cultivationId) => {
    try {
      const res = await api.get(`person/responsible/${cultivationId}`);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      logError(err);
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
      logError(err);
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
      logError(err);
    }
    return false;
  };
  const deletePerson = async (id) => {
    if (!userData) return;
    try {
      const res = await api.delete(`/person/${id}?userID=${userData.id}`);
      return true;
    } catch (err) {
      logError(err);
    }
    return null;
  };
  //************ User managment methods ************
  const loginFromCookies = async () => {
    setIsPending(true);
    const storedUserData = userCookie["user"];
    if (storedUserData) {
      setUserDataAfterLogin(storedUserData);
      setIsPending(false);
      return true;
    }
    setIsPending(false);
    return false;
  };
  const setUserDataAfterLogin = (newUserData) => {
    const newPerson = userFromResponse(newUserData);
    setUserCookie("user", newPerson, {
      path: "/",
    });
    setIsLoggedIn(true);
    setUserData(newPerson);
    setIsPending(false);
  };
  const changePassword = async (oldPassword, newPassword) => {
    if (!userData) return;
    try {
      const res = await api.post(
        `/person/changepassword/${userData.id}?newPassword=${newPassword}&oldPassword=${oldPassword}`
      );
      if (res) {
        return true;
      }
    } catch (err) {
      logError(err);
    }
    return null;
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
        isPending,
        logIn,
        logOut,
        getPersons,
        getPerson,
        loginFromCookies,
        getResponsibleWorkers,
        addPerson,
        deletePerson,
        changePassword,
      }}
    >
      {children}
    </PersonContext.Provider>
  );
}
