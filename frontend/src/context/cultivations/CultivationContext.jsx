import { ReactNode, createContext, useContext, useState } from "react";
import {
  exampleCultivations,
  exampleFinishedCultivations,
} from "../../exampleData/ExampleCultivations";
import { useUserContext } from "../UserContext";
import api from "../../api/api";

const CultivationContext = createContext();

export function useCultivationContext() {
  return useContext(CultivationContext);
}

export function CultivationContextProvider({ children }) {
  const { userData } = useUserContext();
  //************ Get methods ************
  const getActiveCultivations = async () => {
    return exampleCultivations;
    try {
      const res = await api.get("/cultivation/active");
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
    return exampleCultivations;
  };
  const getFinishedCultivations = async () => {
    return exampleFinishedCultivations;
    try {
      const res = await api.get("/cultivation/finished");
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
    return exampleFinishedCultivations;
  };
  const getCultivation = async (id) => {
    const foundCultivation = exampleCultivations.find(
      (cultivation) => cultivation.id === id
    );
    return (
      foundCultivation ??
      exampleFinishedCultivations.find((cultivation) => cultivation.id === id)
    );
    try {
      const res = await api.get(`/cultivation/${id}`);
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
  const getAssignedCultivations = async () => {
    return exampleCultivations;
    if (!userData) return [];
    try {
      const res = await api.get(`/cultivation/user/${userData.id}`);
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
    return exampleCultivations;
  };
  //************ Get methods ************
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
