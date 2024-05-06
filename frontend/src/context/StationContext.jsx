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
    return exampleStations;
    try {
      const res = await api.get("/station");
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getStation = async (id) => {
    return exampleStations.find((station) => station.id === id);

    try {
      const res = await api.get(`/station/${id}`);
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
    // const foundCultivation = exampleCultivations.find(
    //   (cultivation) => cultivation.id === id
    // );
    // return (
    //   foundCultivation ??
    //   exampleFinishedCultivations.find((cultivation) => cultivation.id === id)
    // );
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
