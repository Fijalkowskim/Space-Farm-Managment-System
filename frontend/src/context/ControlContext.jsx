import { ReactNode, createContext, useContext, useState } from "react";
import api from "../api/api";

const ControlContext = createContext();

export function useControlContext() {
  return useContext(ControlContext);
}

export function ControlContextProvider({ children }) {
  //************ Get methods ************
  const getControls = async () => {
    return;
    try {
      const res = await api.get("/control");
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getControl = async (id) => {
    return;
    //return exampleStations.find((station) => station.id === id);

    try {
      const res = await api.get(`/station/${id}`);
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ControlContext.Provider
      value={{
        getControl,
        getControls,
      }}
    >
      {children}
    </ControlContext.Provider>
  );
}
