import { ReactNode, createContext, useContext, useState } from "react";
import api from "../../api/api";

const PlantContext = createContext();

export function usePlantContext() {
  return useContext(PlantContext);
}

export function PlantContextProvider({ children }) {
  //************ Get methods ************
  const getPlants = async () => {
    try {
      const res = await api.get("/plant");
      if (res.data) {
        return res.data.content;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };
  const getPlant = async (id) => {
    try {
      const res = await api.get(`/plant/${id}`);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };
  //************ Put methods ************
  const addPlant = async (plantRequest) => {
    try {
      const res = await api.put("/plant", plantRequest, {
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
  //************ Post methods ************
  const updatePlant = async (id, plantRequest) => {
    try {
      const res = await api.post(`/plant/${id}`, plantRequest, {
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
  //************ Delete methods ************
  const deletePlant = async (id) => {
    try {
      await api.delete(`/plant/${id}`);
      return true;
    } catch (err) {
      console.log(err);
    }
    return false;
  };

  return (
    <PlantContext.Provider
      value={{
        getPlants,
        getPlant,
        addPlant,
        updatePlant,
        deletePlant,
      }}
    >
      {children}
    </PlantContext.Provider>
  );
}
