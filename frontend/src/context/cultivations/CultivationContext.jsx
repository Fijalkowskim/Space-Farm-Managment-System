import { ReactNode, createContext, useContext, useState } from "react";
import {
  exampleCultivations,
  exampleFinishedCultivations,
} from "../../exampleData/ExampleCultivations";
import { usePersonContext } from "../PersonContext";
import api from "../../api/api";
import { useCultivationDetailsContext } from "./CultivationDetailsContext";

const CultivationContext = createContext();

export function useCultivationContext() {
  return useContext(CultivationContext);
}

export function CultivationContextProvider({ children }) {
  const { userData } = usePersonContext();
  const { editedCultivation, setEditedCultivation } =
    useCultivationDetailsContext();
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
  const getAssignedCultivations = async (userID) => {
    return exampleCultivations;
    try {
      const res = await api.get(`/cultivation/user/${userID}`);
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
    return exampleCultivations;
  };
  //************ Put methods ************
  const addCultivaiton = async (cultivationRequest) => {
    console.log(cultivationRequest);
    if (!userData) return false;
    try {
      const res = await api.put(
        `/cultivation?userID=${userData.id}`,
        cultivationRequest
      );
      if (res.data) {
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  };
  //************ Post methods ************
  const updateCultivation = async (previousCultivation, newCultivation) => {
    if (previousCultivation.id !== newCultivation.id) return undefined;
    setEditedCultivation(undefined);
    return newCultivation;
    try {
      const res = await api.post(`/cultivation/${newCultivation.id}`);
      if (res.data) {
        previousCultivation = newCultivation;
        return newCultivation;
      }
    } catch (err) {
      console.log(err);
    }
    setEditedCultivation(undefined);
    return undefined;
  };
  return (
    <CultivationContext.Provider
      value={{
        getActiveCultivations,
        getFinishedCultivations,
        getCultivation,
        getAssignedCultivations,
        addCultivaiton,
        updateCultivation,
      }}
    >
      {children}
    </CultivationContext.Provider>
  );
}
