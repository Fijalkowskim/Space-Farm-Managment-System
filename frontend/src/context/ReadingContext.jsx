import { ReactNode, createContext, useContext, useState } from "react";
import api from "../api/api";
import { usePopupContext } from "./general/PopupContext";
const ReadingContext = createContext();

export function useReadingContext() {
  return useContext(ReadingContext);
}

export function ReadingContextProvider({ children }) {
  const { logError } = usePopupContext();

  //************ Get methods ************
  const getReadings = async () => {
    try {
      const res = await api.get("/reading");
      if (res.data) {
        return res.data.content;
      }
    } catch (err) {
      logError(err);
    }
    return undefined;
  };
  const getReading = async (id) => {
    //return exampleReadings.find((Reading) => Reading.id === id);

    try {
      const res = await api.get(`/reading/${id}`);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      logError(err);
    }
    return undefined;
  };
  const getReadingsByControl = async (id) => {
    try {
      const res = await api.get(`/reading/control/${id}`);
      if (res.data) {
        return res.data.content;
      }
    } catch (err) {
      logError(err);
    }
    return [];
  };
  //************ Put methods ************
  const addReading = async (readingRequest) => {
    try {
      const res = await api.put("/reading", readingRequest, {
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
  //************ Post methods ************
  const updateReading = async (id, readingRequest) => {
    try {
      const res = await api.post(`/reading/${id}`, readingRequest, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data) {
        return true;
      }
    } catch (err) {
      logError(err);
    }
    return false;
  };
  //************ Delete methods ************
  const deleteReading = async (id) => {
    try {
      await api.delete(`/reading/${id}`);
      return true;
    } catch (err) {
      logError(err);
    }
    return false;
  };
  return (
    <ReadingContext.Provider
      value={{
        getReadings,
        getReading,
        addReading,
        updateReading,
        deleteReading,
        getReadingsByControl,
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
}
