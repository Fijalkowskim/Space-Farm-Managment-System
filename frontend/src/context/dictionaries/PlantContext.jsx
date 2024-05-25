import { ReactNode, createContext, useContext, useState } from "react";
import api from "../../api/api";

const PlantContext = createContext();

export function usePlantContext() {
  return useContext(PlantContext);
}

export function PlantContextProvider({ children }) {
  //************ Get methods ************
  const getPlants = async () => {
    try {
      const res = await api.get("/plant");
      if (res.data) {
        return res.data.content;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getPlant = async (id) => {
    try {
      const res = await api.get(`/plant/${id}`);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <PlantContext.Provider value={{ getPlants, getPlant }}>
      {children}
    </PlantContext.Provider>
  );
}
