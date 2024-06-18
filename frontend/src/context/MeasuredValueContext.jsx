import { ReactNode, createContext, useContext, useState } from "react";
import api from "../api/api";
import { usePopupContext } from "./general/PopupContext";

const MeasuredValueContext = createContext();

export function useMeasuredValueContext() {
  return useContext(MeasuredValueContext);
}

export function MeasuredValueContextProvider({ children }) {
  const { logError } = usePopupContext();
  //************ Get methods ************
  const getMeasuredValues = async () => {
    try {
      const res = await api.get("/measuredValue");
      if (res.data) {
        return res.data.content;
      }
    } catch (err) {
      logError(err);
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
      logError(err);
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
      logError(err);
    }
    return null;
  };

  const updateMeasuredValue = async (id, measuredValueRequest) => {
    try {
      const res = await api.post(`/measuredValue/${id}`, measuredValueRequest, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      logError(err);
    }
    return null;
  };

  const deleteMeasuredValue = async (id) => {
    try {
      const res = await api.delete(`/measuredValue/${id}`);
      return true;
    } catch (err) {
      logError(err);
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
