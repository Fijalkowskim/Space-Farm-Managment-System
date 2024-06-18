import { ReactNode, createContext, useContext, useState } from "react";
import { exampleStages } from "../exampleData/ExampleStages";
import api from "../api/api";
import { usePopupContext } from "./general/PopupContext";

const StageContext = createContext();

export function useStageContext() {
  return useContext(StageContext);
}

export function StageContextProvider({ children }) {
  const { logError } = usePopupContext();
  //************ Get methods ************
  const getStages = async () => {
    try {
      const res = await api.get("/stage");
      if (res.data) {
        return res.data.content;
      }
    } catch (err) {
      logError(err);
    }
    return exampleStages;
  };

  const getStage = async (id) => {
    try {
      const res = await api.get(`/stage/${id}`);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      logError(err);
    }
    return exampleStages.find((stage) => stage.id === id);
  };
  const getStageByCultivation = async (id) => {
    try {
      const res = await api.get(`/stage/cultivation/${id}`);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      logError(err);
    }
    return [];
  };

  const addStage = async (stageRequest) => {
    try {
      const res = await api.put("/stage", stageRequest, {
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

  const updateStage = async (id, stageRequest) => {
    try {
      const res = await api.post(`/stage/${id}`, stageRequest, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res) {
        return true;
      }
    } catch (err) {
      logError(err);
    }
    return false;
  };

  const deleteStage = async (id) => {
    try {
      await api.delete(`/stage/${id}`);
      return true;
    } catch (err) {
      logError(err);
    }
    return false;
  };

  return (
    <StageContext.Provider
      value={{
        getStages,
        getStage,
        addStage,
        updateStage,
        deleteStage,
        getStageByCultivation,
      }}
    >
      {children}
    </StageContext.Provider>
  );
}
