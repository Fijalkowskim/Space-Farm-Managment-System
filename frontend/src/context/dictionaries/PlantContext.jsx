import { ReactNode, createContext, useContext, useState } from "react";
import api from "../../api/api";

const PlantContext = createContext();

export function usePlantContext() {
  return useContext(PlantContext);
}

export function PlantContextProvider({ children }) {
  const [plants, setPlants] = useState([]);
  const [plant, setPlant] = useState(null);
  //************ Get methods ************
  const getPlants = async () => {
    try {
      const res = await api.get("/plant");
      if (res.data) {
        setPlants(res.data.content);
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
        setPlant(res.data);
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
        setPlants((prevPlants) => [...prevPlants, res.data]);
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
        setPlants((prevPlants) =>
            prevPlants.map((plant) => (plant.id === id ? res.data : plant))
        );
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
      setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
      return true;
    } catch (err) {
      console.log(err);
    }
    return false;
  };

  return (
    <PlantContext.Provider
      value={{
        plant,
        plants,
        getPlants,
        getPlant,
        addPlant,
        updatePlant,
        deletePlant,
      }}>
      {children}
    </PlantContext.Provider>
  );
}
