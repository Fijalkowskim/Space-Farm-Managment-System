import { ReactNode, createContext, useContext, useState } from "react";
import api from "../api/api";

const HarvestContext = createContext();

export function useHarvestContext() {
  return useContext(HarvestContext);
}

export function HarvestContextProvider({ children }) {
  //************ Get methods ************
  const getHarvests = async () => {
    return;
    try {
      const res = await api.get("/harvest");
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getHarvest = async (id) => {
    return;
    //return exampleHarvests.find((Harvest) => Harvest.id === id);

    try {
      const res = await api.get(`/harvest/${id}`);
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <HarvestContext.Provider
      value={{
        getHarvests,
        getHarvest,
      }}
    >
      {children}
    </HarvestContext.Provider>
  );
}
