import { ReactNode, createContext, useContext, useState } from "react";
import api from "../api/api";
import { usePopupContext } from "./general/PopupContext";

const HarvestContext = createContext();

export function useHarvestContext() {
  return useContext(HarvestContext);
}

export function HarvestContextProvider({ children }) {
  const [harvests, setHarvests] = useState([]);
  const { logError } = usePopupContext();
  //************ Get methods ************
  const getHarvests = async () => {
    try {
      const res = await api.get("/harvest");
      if (res.data) {
        setHarvests(res.data.content); // Assuming res.data.content contains the list of harvests
        return res.data.content;
      }
    } catch (err) {
      console.log(err);
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
      console.log(err);
    }
    return null;
  };

  const addHarvest = async (harvestRequest) => {
    try {
      const res = await api.put("/harvest", harvestRequest);
      if (res.data) {
        setHarvests([...harvests, res.data]);
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };

  const updateHarvest = async (id, harvestRequest) => {
    try {
      const res = await api.post(`/harvest/${id}`, harvestRequest);
      if (res.data) {
        const updatedHarvests = harvests.map((harvest) =>
          harvest.id === id ? res.data : harvest
        );
        setHarvests(updatedHarvests);
        return res.data;
      }
    } catch (err) {
      console.log(err);
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
      }}
    >
      {children}
    </HarvestContext.Provider>
  );
}
