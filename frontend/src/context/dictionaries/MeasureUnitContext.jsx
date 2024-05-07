import { ReactNode, createContext, useContext, useState } from "react";
import api from "../../api/api";

const MeasureUnitContext = createContext();

export function useMeasureUnitContext() {
  return useContext(MeasureUnitContext);
}

export function MeasureUnitContextProvider({ children }) {
  //************ Get methods ************
  const getMeasureUnits = async () => {
    return;
    try {
      const res = await api.get("/measureUnit");
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getMeasureUnit = async (id) => {
    return;
    //return exampleMeasureUnits.find((MeasureUnit) => MeasureUnit.id === id);

    try {
      const res = await api.get(`/measureUnit/${id}`);
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <MeasureUnitContext.Provider
      value={{
        getMeasureUnits,
        getMeasureUnit,
      }}
    >
      {children}
    </MeasureUnitContext.Provider>
  );
}
