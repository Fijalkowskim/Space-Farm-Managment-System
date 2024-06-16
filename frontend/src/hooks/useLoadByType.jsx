import { useState, useEffect } from "react";
import { useCultivationContext } from "../context/cultivations/CultivationContext";
import { useStageContext } from "../context/StageContext";
import { useStationContext } from "../context/StationContext";
import { usePersonContext } from "../context/PersonContext";
import { usePlantContext } from "../context/dictionaries/PlantContext";
import { useCultivationTypeContext } from "../context/dictionaries/CultivationTypeContext";
import { useStageTypeContext } from "../context/dictionaries/StageTypeContext";

export const useLoadByType = (dataType) => {
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(false);
  const { getCultivations } = useCultivationContext();
  const { getStages } = useStageContext();
  const { getStations } = useStationContext();
  const { getPersons } = usePersonContext();
  const { getPlants } = usePlantContext();
  const { getCultivationTypes } = useCultivationTypeContext();
  const { getStageTypes } = useStageTypeContext();

  useEffect(() => {
    const loadData = async () => {
      var loadingMethod;
      if (dataType === undefined) return;
      switch (dataType.toLowerCase()) {
        case "plant":
          loadingMethod = getPlants;
          break;
        case "cultivationtype":
          loadingMethod = getCultivationTypes;
          break;
        case "station":
          loadingMethod = getStations;
          break;
        case "stageType":
          loadingMethod = getStageTypes;
          break;
        case "worker":
          loadingMethod = getPersons;
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
    loadData();
  }, [dataType, setData, setIsPending]);

  return { data, isPending };
};
