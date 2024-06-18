import React, { useEffect, useState } from "react";
import CultivationCard from "./displayCards/CultivationCard";
import WorkerCard from "./displayCards/WorkerCard";
import { NavLink, useNavigate } from "react-router-dom";
import StationCard from "./displayCards/StationCard";
import CustomButton from "../general/CustomButton";
import { FaRegTrashAlt } from "react-icons/fa";
import PlantCard from "./displayCards/PlantCard";
import StageCard from "./displayCards/StageCard";
import ControlCard from "./displayCards/ControlCard";
import StageTypeCard from "./displayCards/StageTypeCard";
import MeasureUnitCard from "./displayCards/MeasureUnitCard";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { useDataCreationContext } from "../../context/general/DataCreationContext";
import CultivationTypeCard from "./displayCards/CultivationTypeCard";
import { useDelete } from "../../hooks/useDelete";
import LoadingBar from "../general/LoadingBar";
import HarvestCard from "./displayCards/HarvestCard";
function DisplayCard({
  data,
  contentType,
  showDeleteButton,
  showRemoveButton,
  disableNavigation,
  multiselect,
  propertyName,
  dictionaryType,
  selectById = false,
}) {
  const navigate = useNavigate();
  const {
    setCurrentObjectProperty,
    getCurrentObjectProperty,
    objectCreationQueue,
  } = useDataCreationContext();
  const [loadedData, setLoadedData] = useState(data);
  const [isSelected, setIsSelected] = useState(false);
  const { isDeleting, deleteItem } = useDelete(contentType, data?.id);

  useEffect(() => {
    if (selectById && data.id) {
      setLoadedData(data.id);
    } else {
      setLoadedData(data);
    }
  }, [selectById]);

  useEffect(() => {
    if (
      data === undefined ||
      propertyName === undefined ||
      getCurrentObjectProperty(propertyName) === undefined
    )
      return;
    setIsSelected(
      (!selectById && getCurrentObjectProperty(propertyName)?.id === data.id) ||
        (selectById && getCurrentObjectProperty(propertyName) === data.id) ||
        (Array.isArray(getCurrentObjectProperty(propertyName)) &&
          getCurrentObjectProperty(propertyName).find(
            (obj) =>
              (selectById && obj === data.id) ||
              (!selectById && obj?.id === data.id)
          ))
    );
  }, [objectCreationQueue, selectById, data, propertyName]);

  if (isDeleting) return <LoadingBar />;
  return (
    <div
      className={`flex flex-row items-start flex-nowrap justify-between gap-4 p-4 text-text-50 bg-background-800 hover:bg-background-800/80 transition-colors rounded-sm shadow-sm w-full text-base relative cursor-pointer ${
        isSelected ? "border-2 border-primary-700" : ""
      }`}
      onClick={() => {
        if (multiselect !== undefined) {
          if (multiselect === true) {
            const oldProperty = getCurrentObjectProperty(propertyName);
            if (oldProperty === undefined) {
              setCurrentObjectProperty(propertyName, [loadedData]);
            } else {
              setCurrentObjectProperty(
                propertyName,
                oldProperty.find(
                  (obj) =>
                    (selectById && obj === loadedData) ||
                    (!selectById && obj.id === data.id)
                )
                  ? oldProperty.filter(
                      (obj) =>
                        (selectById && obj !== loadedData) ||
                        (!selectById && obj.id !== data.id)
                    )
                  : [...oldProperty, loadedData]
              );
            }
          } else {
            setCurrentObjectProperty(
              propertyName,
              getCurrentObjectProperty(propertyName) === loadedData
                ? undefined
                : loadedData
            );
          }
          return;
        }
        if (!disableNavigation && !dictionaryType) {
          navigate(data.id ? `/${contentType}/${data.id}` : "/");
        }
      }}
    >
      <div className="flex flex-row items-center flex-wrap justify-between gap-4 w-full">
        {contentType === "cultivation" ? (
          <CultivationCard data={data} />
        ) : contentType === "worker" ? (
          <WorkerCard data={data} />
        ) : contentType === "stage" ? (
          <StageCard data={data} />
        ) : contentType === "stageType" ? (
          <StageTypeCard data={data} />
        ) : contentType === "plant" ? (
          <PlantCard data={data} />
        ) : contentType === "harvest" ? (
          <HarvestCard data={data} />
        ) : contentType === "station" ? (
          <StationCard data={data} />
        ) : contentType === "reading" ? (
          <div>Reading Card</div>
        ) : contentType === "measureUnit" ? (
          <MeasureUnitCard data={data} />
        ) : contentType === "cultivationType" ? (
          <CultivationTypeCard data={data} />
        ) : contentType === "control" ? (
          <ControlCard data={data} />
        ) : null}
      </div>
      <div className="w-10 flex-shrink-0 flex flex-col items-center justify-center gap-2">
        {showDeleteButton === true && (
          <CustomButton
            className={"w-full"}
            onClick={(e) => {
              e.stopPropagation();
              deleteItem();
            }}
            variant={"action"}
          >
            <FaRegTrashAlt />
          </CustomButton>
        )}
        {/* {showRemoveButton === true && (
          <CustomButton
            className={"w-full"}
            onClick={(e) => {
              e.stopPropagation();
            }}
            variant={"error"}
          >
            <IoIosRemoveCircleOutline />
          </CustomButton>
        )} */}
      </div>
    </div>
  );
}

export default DisplayCard;
