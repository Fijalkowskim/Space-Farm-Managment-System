import { ReactNode, createContext, useContext, useState } from "react";
import { useCultivationContext } from "../cultivations/CultivationContext";
import { useStageContext } from "../StageContext";
import { useStationContext } from "../StationContext";
import { usePersonContext } from "../PersonContext";
import { usePlantContext } from "../dictionaries/PlantContext";
import { useFetchArrayData } from "../../hooks/useFetchArrayData";
import { useCultivationTypeContext } from "../dictionaries/CultivationTypeContext";

const ObjectLoadingContext = createContext();

export function useObjectLoadingContext() {
  return useContext(ObjectLoadingContext);
}

export function ObjectLoadingContextProvider({ children }) {
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState();
  const { getCultivations } = useCultivationContext();
  const { getStages } = useStageContext();
  const { getStations } = useStationContext();
  const { getPersons } = usePersonContext();
  const { getPlants } = usePlantContext();
  const { getCultivationTypes } = useCultivationTypeContext();

  const loadObjectsByType = async (dataType) => {
    var loadingMethod;
    if (dataType === undefined) return;
    switch (dataType.toLowerCase()) {
      case "plant":
        loadingMethod = getPlants;
        break;
      case "cultivationtype":
        loadingMethod = getCultivationTypes;
        break;
      default:
        setIsPending(false);
        setData(undefined);
        return;
    }
    if (loadingMethod === undefined) {
      setIsPending(false);
      setData(undefined);
      return;
    }
    setIsPending(true);
    setData(undefined);

    try {
      const newData = await loadingMethod();
      setData(newData);
      setIsPending(false);
    } catch (err) {
      console.log(err);
      setIsPending(false);
    }
  };
  return (
    <ObjectLoadingContext.Provider
      value={{ loadObjectsByType, data, isPending }}
    >
      {children}
    </ObjectLoadingContext.Provider>
  );
}
