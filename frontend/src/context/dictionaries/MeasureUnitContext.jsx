import { ReactNode, createContext, useContext, useState } from "react";
import api from "../../api/api";

const MeasureUnitContext = createContext();

export function useMeasureUnitContext() {
  return useContext(MeasureUnitContext);
}

export function MeasureUnitContextProvider({ children }) {
  const [measureUnits, setMeasureUnits] = useState([]);
  const [measureUnit, setMeasureUnit] = useState(null);

  //************ Get methods ************
  const getMeasureUnits = async () => {
    try {
      const res = await api.get("/dictionaries/measure-units/");
      if (res.data) {
        setMeasureUnits(res.data.content);
        return res.data.content;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };
  const getMeasureUnit = async (id) => {
    //return exampleMeasureUnits.find((MeasureUnit) => MeasureUnit.id === id);

    try {
      const res = await api.get(`/dictionaries/measure-units/${id}`);
      if (res.data) {
        setMeasureUnit(res.data);
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };
  //************ Put methods ************
  const addMeasureUnit = async (measureUnitRequest) => {
    try {
      const res = await api.put("/dictionaries/measure-units/", measureUnitRequest, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data) {
        setMeasureUnits((prevMeasureUnits) => [...prevMeasureUnits, res.data]);
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };
  //************ Post methods ************
  const updateMeasureUnit = async (id, measureUnitRequest) => {
    try {
      const res = await api.post(`/dictionaries/measure-units/${id}`, measureUnitRequest, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data) {
        setMeasureUnits((prevMeasureUnits) =>
            prevMeasureUnits.map((measureUnit) => (measureUnit.id === id ? res.data : measureUnit))
        );
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };
  //************ Delete methods ************
  const deleteMeasureUnit = async (id) => {
    try {
      await api.delete(`/dictionaries/measure-units/${id}`);
      setMeasureUnits((prevMeasureUnits) => prevMeasureUnits.filter((measureUnit) => measureUnit.id !== id));
      return true;
    } catch (err) {
      console.log(err);
    }
    return false;
  };

  return (
    <MeasureUnitContext.Provider
      value={{
        measureUnit,
        measureUnits,
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
