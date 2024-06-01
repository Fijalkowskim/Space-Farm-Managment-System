import React, { useEffect, useState } from "react";
import CultivationCard from "./displayCards/CultivationCard";
import WorkerCard from "./displayCards/WorkerCard";
import { NavLink, useNavigate } from "react-router-dom";
import StationCard from "./displayCards/StationCard";
import CustomButton from "../general/CustomButton";
import { FaRegTrashAlt } from "react-icons/fa";
import PlantCard from "./displayCards/PlantCard";
import StageCard from "./displayCards/StageCard";
import StageTypeCard from "./displayCards/StageTypeCard";
import MeasureUnitCard from "./displayCards/MeasureUnitCard";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { useDataCreationContext } from "../../context/general/DataCreationContext";
import CultivationTypeCard from "./displayCards/CultivationTypeCard";
function DisplayCard({
  data,
  contentType,
  showDeleteButton,
  showRemoveButton,
  disableNavigation,
  multiselect,
  propertyName,
}) {
  const navigate = useNavigate();
  const { setCurrentObjectProperty, getCurrentObjectProperty } =
    useDataCreationContext();
  return (
    <div
      className={`flex flex-row items-start flex-nowrap justify-between gap-4 p-4 text-text-50 bg-background-800 hover:bg-background-800/80 transition-colors rounded-sm shadow-sm w-full text-base relative cursor-pointer ${
        (propertyName !== undefined &&
          getCurrentObjectProperty(propertyName) === data) ||
        (Array.isArray(getCurrentObjectProperty(propertyName)) &&
          getCurrentObjectProperty(propertyName).find(
            (obj) => obj.id === data.id
          ))
          ? "border-2 border-primary-700"
          : ""
      }`}
      onClick={() => {
        if (multiselect !== undefined) {
          if (multiselect === true) {
            const oldProperty = getCurrentObjectProperty(propertyName);
            if (oldProperty === undefined) {
              setCurrentObjectProperty(propertyName, [data]);
            } else {
              setCurrentObjectProperty(
                propertyName,
                oldProperty.find((obj) => obj.id === data.id)
                  ? oldProperty.filter((obj) => obj.id !== data.id)
                  : [...oldProperty, data]
              );
            }
          } else {
            setCurrentObjectProperty(
              propertyName,
              getCurrentObjectProperty(propertyName) === data ? undefined : data
            );
          }
          return;
        }
        if (!disableNavigation) {
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
          <div>Harvest Card</div>
        ) : contentType === "station" ? (
          <StationCard data={data} />
        ) : contentType === "reading" ? (
          <div>Reading Card</div>
        ) : contentType === "measuredUnit" ? (
          <MeasureUnitCard data={data} />
        ) : contentType === "cultivationType" ? (
          <CultivationTypeCard data={data} />
        ) : null}
      </div>
      <div className="w-10 flex-shrink-0 flex flex-col items-center justify-center gap-2">
        {showDeleteButton === true && (
          <CustomButton
            className={"w-full"}
            onClick={(e) => {
              e.stopPropagation();
            }}
            variant={"action"}
          >
            <FaRegTrashAlt />
          </CustomButton>
        )}
        {showRemoveButton === true && (
          <CustomButton
            className={"w-full"}
            onClick={(e) => {
              e.stopPropagation();
            }}
            variant={"error"}
          >
            <IoIosRemoveCircleOutline />
          </CustomButton>
        )}
      </div>
    </div>
  );
}

export default DisplayCard;
