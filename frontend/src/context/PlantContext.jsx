import { ReactNode, createContext, useContext, useState } from "react";
import { examplePlants } from "../exampleData/ExamplePlants";
import api from "../api/api";

const PlantContext = createContext();

export function usePlantContext() {
  return useContext(PlantContext);
}

export function PlantContextProvider({ children }) {
  //************ Get methods ************
  const getPlants = async () => {
    return examplePlants;
    try {
      const res = await api.get("/plants");
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getPlant = async (id) => {
    return examplePlants.find((cultivation) => cultivation.id === id);
    try {
      const res = await api.get(`/plant/${id}`);
      if (res.data) {
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
