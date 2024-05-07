import { ReactNode, createContext, useContext, useState } from "react";
import api from "../api/api";

const MeasuredValueContext = createContext();

export function useMeasuredValueContext() {
  return useContext(MeasuredValueContext);
}

export function MeasuredValueContextProvider({ children }) {
  //************ Get methods ************
  const getMeasuredValues = async () => {
    return;
    try {
      const res = await api.get("/measuredValue");
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getMeasuredValue = async (id) => {
    return;
    //return exampleMeasuredValues.find((MeasuredValue) => MeasuredValue.id === id);

    try {
      const res = await api.get(`/measuredValue/${id}`);
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <MeasuredValueContext.Provider
      value={{
        getMeasuredValues,
        getMeasuredValue,
      }}
    >
      {children}
    </MeasuredValueContext.Provider>
  );
}
