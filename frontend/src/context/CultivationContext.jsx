import { ReactNode, createContext, useContext, useState } from "react";
import {
  exampleCultivations,
  exampleFinishedCultivations,
} from "../exampleData/ExampleCultivations";

const CultivationContext = createContext();

export function useCultivationContext() {
  return useContext(CultivationContext);
}

export function CultivationContextProvider({ children }) {
  const getActiveCultivations = async () => {
    //Api call
    return exampleCultivations;
  };
  const getFinishedCultivations = async () => {
    //Api call
    return exampleFinishedCultivations;
  };
  const getCultivation = async (id) => {
    //Api call
    const foundCultivation = exampleCultivations.find(
      (cultivation) => cultivation.id === id
    );
    return (
      foundCultivation ??
      exampleFinishedCultivations.find((cultivation) => cultivation.id === id)
    );
  };
  return (
    <CultivationContext.Provider
      value={{ getActiveCultivations, getFinishedCultivations, getCultivation }}
    >
      {children}
    </CultivationContext.Provider>
  );
}
