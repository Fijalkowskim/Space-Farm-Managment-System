import { ReactNode, createContext, useContext, useState } from "react";
import api from "../../api/api";
import { usePopupContext } from "../general/PopupContext";

const CultivationTypeContext = createContext();

export function useCultivationTypeContext() {
  return useContext(CultivationTypeContext);
}

export function CultivationTypeContextProvider({ children }) {
  const { logError } = usePopupContext();
  //************ Get methods ************
  const getCultivationTypes = async () => {
    try {
      const res = await api.get("/dictionaries/cultivation-types/");
      if (res.data) {
        return res.data.content;
      }
    } catch (err) {
      logError(err);
    }
    return null;
  };
  const getCultivationType = async (id) => {
    //return exampleCultivationTypes.find((CultivationType) => CultivationType.id === id);

    try {
      const res = await api.get(`/dictionaries/cultivation-types/${id}`);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      logError(err);
    }
    return null;
  };
  //************ Put methods ************
  const addCultivationType = async (cultivationTypeRequest) => {
    try {
      const res = await api.put(
        "/dictionaries/cultivation-types/",
        cultivationTypeRequest,
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
      logError(err);
    }
    return null;
  };
  //************ Post methods ************
  const updateCultivationType = async (id, cultivationTypeRequest) => {
    try {
      const res = await api.post(
        `/dictionaries/cultivation-types/${id}`,
        cultivationTypeRequest,
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
      logError(err);
    }
    return null;
  };
  //************ Delete methods ************
  const deleteCultivationType = async (id) => {
    try {
      await api.delete(`/dictionaries/cultivation-types/${id}`);
      return true;
    } catch (err) {
      logError(err);
    }
    return false;
  };
  return (
    <CultivationTypeContext.Provider
      value={{
        getCultivationTypes,
        getCultivationType,
        addCultivationType,
        updateCultivationType,
        deleteCultivationType,
      }}
    >
      {children}
    </CultivationTypeContext.Provider>
  );
}
