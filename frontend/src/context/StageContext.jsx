import { ReactNode, createContext, useContext, useState } from "react";
import { exampleStages } from "../exampleData/ExampleStages";
import api from "../api/api";

const StageContext = createContext();

export function useStageContext() {
  return useContext(StageContext);
}

export function StageContextProvider({ children }) {
  //************ Get methods ************
  const getStages = async () => {
    return exampleStages;
    try {
      const res = await api.get("/plants");
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getStage = async (id) => {
    return exampleStages.find((cultivation) => cultivation.id === id);
    try {
      const res = await api.get(`/plant/${id}`);
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <StageContext.Provider value={{ getStages, getStage }}>
      {children}
    </StageContext.Provider>
  );
}
