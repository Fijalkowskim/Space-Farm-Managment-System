import { ReactNode, createContext, useContext, useState } from "react";
import api from "../../api/api";
import { usePopupContext } from "../general/PopupContext";

const MeasureUnitContext = createContext();

export function useMeasureUnitContext() {
  return useContext(MeasureUnitContext);
}

export function MeasureUnitContextProvider({ children }) {
  const { logError } = usePopupContext();
  //************ Get methods ************
  const getMeasureUnits = async () => {
    try {
      const res = await api.get("/dictionaries/measure-units/");
      if (res.data) {
        return res.data.content;
      }
    } catch (err) {
      logError(err);
    }
    return null;
  };
  const getMeasureUnit = async (id) => {
    //return exampleMeasureUnits.find((MeasureUnit) => MeasureUnit.id === id);

    try {
      const res = await api.get(`/dictionaries/measure-units/${id}`);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      logError(err);
    }
    return null;
  };
  //************ Put methods ************
  const addMeasureUnit = async (measureUnitRequest) => {
    try {
      const res = await api.put(
        "/dictionaries/measure-units/",
        measureUnitRequest,
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
  const updateMeasureUnit = async (id, measureUnitRequest) => {
    try {
      const res = await api.post(
        `/dictionaries/measure-units/${id}`,
        measureUnitRequest,
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
  const deleteMeasureUnit = async (id) => {
    try {
      await api.delete(`/dictionaries/measure-units/${id}`);
      return true;
    } catch (err) {
      logError(err);
    }
    return false;
  };

  return (
    <MeasureUnitContext.Provider
      value={{
        getMeasureUnits,
        getMeasureUnit,
        addMeasureUnit,
        updateMeasureUnit,
        deleteMeasureUnit,
      }}
    >
      {children}
    </MeasureUnitContext.Provider>
  );
}
