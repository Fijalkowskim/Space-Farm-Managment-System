import { useState, useEffect } from "react";
import { useGlobalReloadContext } from "../context/general/GlobalReloadContext";
import { usePopupContext } from "../context/general/PopupContext";
import { useStationContext } from "../context/StationContext";
import { useControlContext } from "../context/ControlContext";
import { useCultivationTypeContext } from "../context/dictionaries/CultivationTypeContext";
import { useStageContext } from "../context/StageContext";
import { useMeasureUnitContext } from "../context/dictionaries/MeasureUnitContext";
import { useHarvestContext } from "../context/HarvestContext";
import { useMeasuredValueContext } from "../context/MeasuredValueContext";
import { usePersonContext } from "../context/PersonContext";
import { usePlantContext } from "../context/dictionaries/PlantContext";
import { useReadingContext } from "../context/ReadingContext";
import { useStageTypeContext } from "../context/dictionaries/StageTypeContext";
import { useCultivationContext } from "../context/cultivations/CultivationContext";

export const useDelete = (contentType, id) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { logError } = usePopupContext();
  const { setGlobalReload } = useGlobalReloadContext();

  const { deleteStation } = useStationContext();
  const { deleteControl } = useControlContext();
  const { deleteCultivation } = useCultivationContext();
  const { deleteCultivationType } = useCultivationTypeContext();
  const { deleteStage } = useStageContext();
  const { deleteMeasureUnit } = useMeasureUnitContext();
  const { deleteHarvest } = useHarvestContext();
  const { deleteMeasuredValue } = useMeasuredValueContext();
  const { deletePerson } = usePersonContext();
  const { deletePlant } = usePlantContext();
  const { deleteReading } = useReadingContext();
  const { deleteStageType } = useStageTypeContext();

  var deleteMethod;
  switch (contentType) {
    case "cultivation":
      deleteMethod = deleteCultivation;
      break;
    case "station":
      deleteMethod = deleteStation;
      break;
    case "control":
      deleteMethod = deleteControl;
      break;
    case "cultivationType":
      deleteMethod = deleteCultivationType;
      break;
    case "stage":
      deleteMethod = deleteStage;
      break;
    case "measureUnit":
      deleteMethod = deleteMeasureUnit;
      break;
    case "harvest":
      deleteMethod = deleteHarvest;
      break;
    case "measuredValue":
      deleteMethod = deleteMeasuredValue;
      break;
    case "worker":
      deleteMethod = deletePerson;
      break;
    case "plant":
      deleteMethod = deletePlant;
      break;
    case "reading":
      deleteMethod = deleteReading;
      break;
    case "stageType":
      deleteMethod = deleteStageType;
      break;
  }
  const deleteItem = async () => {
    if (!deleteStation) return;
    setIsDeleting(true);
    try {
      const resp = await deleteMethod(id);
      setIsDeleting(false);
      setGlobalReload(true);
      return true;
    } catch (err) {
      logError(err);
    }
    setIsDeleting(false);
    return false;
  };

  return { isDeleting, deleteItem };
};
