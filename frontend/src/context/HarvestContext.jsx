import { ReactNode, createContext, useContext, useState } from "react";
import api from "../api/api";
import { usePopupContext } from "./general/PopupContext";

const HarvestContext = createContext();

export function useHarvestContext() {
  return useContext(HarvestContext);
}

export function HarvestContextProvider({ children }) {
  const { logError } = usePopupContext();
  //************ Get methods ************
  const getHarvests = async () => {
    try {
      const res = await api.get("/harvest");
      if (res.data) {
        return res.data.content;
      }
    } catch (err) {
      logError(err);
    }
    return [];
  };

  const getHarvest = async (id) => {
    try {
      const res = await api.get(`/harvest/${id}`);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      logError(err);
    }
    return null;
  };
  const getHarvestByCultivation = async (id) => {
    try {
      const res = await api.get(`/harvest/cultivation/${id}`);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      logError(err);
    }
    return [];
  };

  const addHarvest = async (harvestRequest) => {
    try {
      const res = await api.put("/harvest", harvestRequest);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      logError(err);
    }
    return null;
  };

  const updateHarvest = async (id, harvestRequest) => {
    try {
      const res = await api.post(`/harvest/${id}`, harvestRequest);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      logError(err);
    }
    return null;
  };

  const deleteHarvest = async (id) => {
    try {
      const res = await api.delete(`/harvest/${id}`);
      return true;
    } catch (err) {
      logError(err);
    }
    return null;
  };

  return (
    <HarvestContext.Provider
      value={{
        getHarvests,
        getHarvest,
        addHarvest,
        updateHarvest,
        deleteHarvest,
        getHarvestByCultivation,
      }}
    >
      {children}
    </HarvestContext.Provider>
  );
}
