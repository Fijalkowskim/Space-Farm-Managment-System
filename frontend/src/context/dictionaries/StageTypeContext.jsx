import { ReactNode, createContext, useContext, useState } from "react";
import api from "../../api/api";

const StageTypeContext = createContext();

export function useStageTypeContext() {
  return useContext(StageTypeContext);
}

export function StageTypeContextProvider({ children }) {
  //************ Get methods ************
  const getStageTypes = async () => {
    return;
    try {
      const res = await api.get("/stageType");
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getStageType = async (id) => {
    return;
    //return exampleStageTypes.find((StageType) => StageType.id === id);

    try {
      const res = await api.get(`/stageType/${id}`);
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <StageTypeContext.Provider
      value={{
        getStageTypes,
        getStageType,
      }}
    >
      {children}
    </StageTypeContext.Provider>
  );
}
