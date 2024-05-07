import { ReactNode, createContext, useContext, useState } from "react";
import api from "../api/api";

const ReadingContext = createContext();

export function useReadingContext() {
  return useContext(ReadingContext);
}

export function ReadingContextProvider({ children }) {
  //************ Get methods ************
  const getReadings = async () => {
    return;
    try {
      const res = await api.get("/reading");
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getReading = async (id) => {
    return;
    //return exampleReadings.find((Reading) => Reading.id === id);

    try {
      const res = await api.get(`/reading/${id}`);
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ReadingContext.Provider
      value={{
        getReadings,
        getReading,
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
}
