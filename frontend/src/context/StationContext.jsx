import { ReactNode, createContext, useContext, useState } from "react";
import api from "../api/api";
import { exampleStations } from "../exampleData/ExampleStations";

const StationContext = createContext();

export function useStationContext() {
  return useContext(StationContext);
}

export function StationContextProvider({ children }) {
  //************ Get methods ************
  const getStations = async () => {
    try {
      const res = await api.get("/station");
      if (res.data) {
        return res.data.content;
      }
    } catch (err) {
      console.log(err);
    }
    return undefined;
  };
  const getStation = async (id) => {
    try {
      const res = await api.get(`/station/${id}`);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
    return undefined;
  };
  return (
    <StationContext.Provider
      value={{
        getStations,
        getStation,
      }}
    >
      {children}
    </StationContext.Provider>
  );
}
