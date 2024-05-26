import { ReactNode, createContext, useContext, useState } from "react";
import api from "../api/api";

const MeasuredValueContext = createContext();

export function useMeasuredValueContext() {
  return useContext(MeasuredValueContext);
}

export function MeasuredValueContextProvider({ children }) {
  //************ Get methods ************
  const getMeasuredValues = async () => {
    try {
      const res = await api.get("/measuredValue");
      if (res.data) {
        return res.data.content; 
      }
    } catch (err) {
      console.log(err);
    }
    return [];
  };

  const getMeasuredValue = async (id) => {
    try {
      const res = await api.get(`/measuredValue/${id}`);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };

  const addMeasuredValue = async (measuredValueRequest) => {
    try {
      const res = await api.put("/measuredValue", measuredValueRequest);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };

  const updateMeasuredValue = async (id, measuredValueRequest) => {
    try {
      const res = await api.post(`/measuredValue/${id}`, measuredValueRequest,{
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };

  const deleteMeasuredValue = async (id) => {
    try {
      const res = await api.delete(`/measuredValue/${id}`);
      if (res.status === 200) {
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  };

  return (
    <MeasuredValueContext.Provider
      value={{
        getMeasuredValues,
        getMeasuredValue,
        addMeasuredValue,
        updateMeasuredValue,
        deleteMeasuredValue,
      }}
    >
      {children}
    </MeasuredValueContext.Provider>
  );
}
