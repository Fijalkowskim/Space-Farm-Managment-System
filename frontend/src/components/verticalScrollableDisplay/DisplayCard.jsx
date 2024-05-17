import React, { useEffect } from "react";
import CultivationCard from "./displayCards/CultivationCard";
import WorkerCard from "./displayCards/WorkerCard";
import { NavLink } from "react-router-dom";
import StationCard from "./displayCards/StationCard";
import CustomButton from "../general/CustomButton";
import { FaRegTrashAlt } from "react-icons/fa";
import PlantCard from "./displayCards/PlantCard";
import StageCard from "./displayCards/StageCard";
import StageTypeCard from "./displayCards/StageTypeCard";
import MeasureUnitCard from "./displayCards/MeasureUnitCard";
import { IoIosRemoveCircleOutline } from "react-icons/io";
function DisplayCard({
  data,
  contentType,
  showDeleteButton,
  showRemoveButton,
}) {
  return (
    <NavLink
      to={data.id ? `/${contentType}/${data.id}` : "/"}
      className="flex flex-row items-start flex-nowrap justify-between gap-4 p-4 text-text-50 bg-background-800 hover:bg-background-800/80 transition-colors rounded-sm shadow-sm w-full text-base relative"
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
          <CultivationCard data={data} />
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
    </NavLink>
  );
}

export default DisplayCard;
