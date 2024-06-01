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
    return [];
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
    return null;
  };
  //************ Put methods ************
  const addStation = async () => {
    try {
      const res = await api.put("/station");
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };
  //************ Post methods ************
  const updateStation = async (id) => {
    //nie jestem pewny co do dzialania tego endpointu, to nie dodaje do providera
    try {
      const res = await api.post(`/station/${id}`);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };
  //************ Delete methods ************
  const deleteStation = async (id) => {
    try {
      const res = await api.delete(`/station/${id}`);
      if (res.data()) {
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };

  return (
    <StationContext.Provider
      value={{
        getStations,
        getStation,
        addStation,
        deleteStation,
      }}
    >
      {children}
    </StationContext.Provider>
  );
}
