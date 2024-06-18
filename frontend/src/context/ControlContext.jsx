import { ReactNode, createContext, useContext, useState } from "react";
import api from "../api/api";
import { usePopupContext } from "./general/PopupContext";

const ControlContext = createContext();

export function useControlContext() {
  return useContext(ControlContext);
}

export function ControlContextProvider({ children }) {
  const { logError } = usePopupContext();
  //************ Get methods ************
  const getControls = async () => {
    try {
      const res = await api.get("/control");
      if (res.data) {
        return res.data.content;
      }
    } catch (err) {
      logError(err);
    }
    return [];
  };
  const getControl = async (id) => {
    try {
      const res = await api.get(`/control/${id}`);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      logError(err);
    }
    return null;
  };
  const getControlsByStage = async (id) => {
    try {
      const res = await api.get(`/control/stage/${id}`);
      if (res.data) {
        return res.data.content;
      }
    } catch (err) {
      logError(err);
    }
    return [];
  };
  const getControlReadings = async (id, page = 0, pageSize = 20) => {
    try {
      const res = await api.get(`/control/${id}/readings`);
      if (res.data) {
        return res.data.content;
      }
    } catch (err) {
      logError(err);
    }
    return [];
  };
  const deleteControl = async (id) => {
    try {
      const res = await api.delete(`/control/${id}`);
      if (res.data()) {
        return true;
      }
    } catch (err) {
      logError(err);
    }
    return null;
  };
  const addControl = async (controlRequest) => {
    try {
      const res = await api.put("/control", controlRequest, {
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
  const updateControl = async (id, controlRequest) => {
    try {
      const res = await api.post(`/control/${id}`, controlRequest, {
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

  return (
    <ControlContext.Provider
      value={{
        getControls,
        getControl,
        getControlReadings,
        deleteControl,
        addControl,
        updateControl,
        getControlsByStage,
      }}
    >
      {children}
    </ControlContext.Provider>
  );
}
