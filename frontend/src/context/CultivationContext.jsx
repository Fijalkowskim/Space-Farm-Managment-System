import { ReactNode, createContext, useContext, useState } from "react";
import {
  exampleCultivations,
  exampleFinishedCultivations,
} from "../exampleData/ExampleCultivations";
import { useUserContext } from "./UserContext";

const CultivationContext = createContext();

export function useCultivationContext() {
  return useContext(CultivationContext);
}

export function CultivationContextProvider({ children }) {
  const { userData } = useUserContext();
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
  const getAssignedCultivations = async () => {
    if (!userData) return [];
    //Api call
    return exampleCultivations;
  };
  return (
    <CultivationContext.Provider
      value={{
        getActiveCultivations,
        getFinishedCultivations,
        getCultivation,
        getAssignedCultivations,
      }}
    >
      {children}
    </CultivationContext.Provider>
  );
}
