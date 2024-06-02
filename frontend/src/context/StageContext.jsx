import { ReactNode, createContext, useContext, useState } from "react";
import { exampleStages } from "../exampleData/ExampleStages";
import api from "../api/api";

const StageContext = createContext();

export function useStageContext() {
  return useContext(StageContext);
}

export function StageContextProvider({ children }) {
  const [stages, setStages] = useState(exampleStages);
  const [stage, setStage] = useState(null);

  //************ Get methods ************
  const getStages = async () => {
    try {
      const res = await api.get("/stage");
      if (res.data) {
        setStages(res.data.content); // Assuming res.data.content contains the list of stages
        return res.data.content;
      }
    } catch (err) {
      console.log(err);
    }
    return exampleStages;
  };

  const getStage = async (id) => {
    try {
      const res = await api.get(`/stage/${id}`);
      if (res.data) {
        setStage(res.data);
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
    return exampleStages.find((stage) => stage.id === id);
  };

  const addStage = async (stageRequest) => {
    try {
      const res = await api.put("/stage", stageRequest, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data) {
        setStages((prevStages) => [...prevStages, res.data]);
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };

  const updateStage = async (id, stageRequest) => {
    try {
      const res = await api.post(`/stage/${id}`, stageRequest, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data) {
        setStages((prevStages) =>
          prevStages.map((stage) => (stage.id === id ? res.data : stage))
        );
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };

  const deleteStage = async (id) => {
    try {
      await api.delete(`/stage/${id}`);
      setStages((prevStages) => prevStages.filter((stage) => stage.id !== id));
      return true;
    } catch (err) {
      console.log(err);
    }
    return false;
  };

  return (
    <StageContext.Provider
      value={{
        stages,
        stage,
        getStages,
        getStage,
        addStage,
        updateStage,
        deleteStage,
      }}
    >
      {children}
    </StageContext.Provider>
  );
}
