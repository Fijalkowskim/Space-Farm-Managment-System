import { ReactNode, createContext, useContext, useState } from "react";
import api from "../../api/api";

const StageTypeContext = createContext();

export function useStageTypeContext() {
  return useContext(StageTypeContext);
}

export function StageTypeContextProvider({ children }) {
  //************ Get methods ************
  const getStageTypes = async () => {
    try {
      const res = await api.get("/dictionaries/stage-types/");
      if (res.data) {
        return res.data.content;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };
  const getStageType = async (id) => {
    try {
      const res = await api.get(`/dictionaries/stage-types/${id}`);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };
  //************ Put methods ************
  const addStageType = async (stageTypeRequest) => {
    try {
      const res = await api.put(
        "/dictionaries/stage-types/",
        stageTypeRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };
  //************ Post methods ************
  const updateStageType = async (id, stageTypeRequest) => {
    try {
      const res = await api.post(
        `/dictionaries/stage-types/${id}`,
        stageTypeRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };
  //************ Delete methods ************
  const deleteStageType = async (id) => {
    try {
      await api.delete(`/dictionaries/stage-types/${id}`);
      return true;
    } catch (err) {
      console.log(err);
    }
    return false;
  };
  return (
    <StageTypeContext.Provider
      value={{
        getStageTypes,
        getStageType,
        addStageType,
        updateStageType,
        deleteStageType,
      }}
    >
      {children}
    </StageTypeContext.Provider>
  );
}
