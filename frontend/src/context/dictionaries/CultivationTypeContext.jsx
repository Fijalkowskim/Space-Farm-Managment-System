import { ReactNode, createContext, useContext, useState } from "react";
import api from "../../api/api";

const CultivationTypeContext = createContext();

export function useCultivationTypeContext() {
  return useContext(CultivationTypeContext);
}

export function CultivationTypeContextProvider({ children }) {
  //************ Get methods ************
  const getCultivationTypes = async () => {
    return;
    try {
      const res = await api.get("/cultivationType");
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getCultivationType = async (id) => {
    return;
    //return exampleCultivationTypes.find((CultivationType) => CultivationType.id === id);

    try {
      const res = await api.get(`/cultivationType/${id}`);
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <CultivationTypeContext.Provider
      value={{
        getCultivationTypes,
        getCultivationType,
      }}
    >
      {children}
    </CultivationTypeContext.Provider>
  );
}
