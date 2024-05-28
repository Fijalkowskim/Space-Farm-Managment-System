import { ReactNode, createContext, useContext, useState } from "react";
import api from "../api/api";

const ReadingContext = createContext();

export function useReadingContext() {
  return useContext(ReadingContext);
}

export function ReadingContextProvider({ children }) {
  const [readings, setReadings] = useState([]);
  const [reading, setReading] = useState(null);

  //************ Get methods ************
  const getReadings = async () => {
    try {
      const res = await api.get("/reading");
      if (res.data) {
        setReadings(res.data.content);
        return res.data.content;
      }
    } catch (err) {
      console.log(err);
    }
    return undefined;
  };
  const getReading = async (id) => {
    //return exampleReadings.find((Reading) => Reading.id === id);

    try {
      const res = await api.get(`/reading/${id}`);
      if (res.data) {
        setReading(res.data);
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
    return undefined;
  };
  //************ Put methods ************
  const addReading = async (readingRequest) => {
    try {
      const res = await api.put("/reading", readingRequest, {
        headers:{
          "Content-Type": "application/json",
        }
      });
      if (res.data) {
        setReadings((prevReadings) => [...prevReadings, res.data]);
        return res.data
      }
    } catch (err) {
      console.log(err);
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
        setReadings((prevReadings) =>
            prevReadings.map((reading) => (reading.id === id ? res.data : reading))
        );
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };
  //************ Delete methods ************
  const deleteReading = async (id) => {
    try {
      await api.delete(`/reading/${id}`);
      setReadings((prevReadings) => prevReadings.filter((reading) => reading.id !== id));
      return true;
    } catch (err) {
      console.log(err);
    }
    return false;
  };
  return (
    <ReadingContext.Provider
      value={{
        reading,
        readings,
        getReadings,
        getReading,
        addReading,
        updateReading,
        deleteReading,
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
}
