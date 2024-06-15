import { ReactNode, createContext, useContext, useState } from "react";
import api from "../api/api";
import { usePopupContext } from "./general/PopupContext";
import { usePersonContext } from "./PersonContext";

const StationContext = createContext();

export function useStationContext() {
  return useContext(StationContext);
}

export function StationContextProvider({ children }) {
  const { logError } = usePopupContext();
  const { userData } = usePersonContext();
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
      logError(err);
    }
    return null;
  };
  const getStationsByCultivation = async (id) => {
    try {
      const res = await api.get(`/station/cultivation/${id}`);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      logError(err);
    }
    return [];
  };
  //************ Put methods ************
  const addStation = async () => {
    try {
      const res = await api.put("/station");
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      logError(err);
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
      logError(err);
    }
    return null;
  };
  //************ Delete methods ************
  const deleteStation = async (id) => {
    if (!userData) return;
    try {
      const res = await api.delete(`/station/${id}?userID=${userData.id}`);
      return true;
    } catch (err) {
      logError(err);
    }
    return null;
  };

  return (
    <StationContext.Provider
      value={{
        getStations,
        getStationsByCultivation,
        getStation,
        addStation,
        deleteStation,
      }}
    >
      {children}
    </StationContext.Provider>
  );
}
