import React, { useEffect } from "react";
import CultivationCard from "./displayCards/CultivationCard";
import WorkerCard from "./displayCards/WorkerCard";
import { NavLink } from "react-router-dom";
import StationCard from "./displayCards/StationCard";
import CustomButton from "../general/CustomButton";
import { FaRegTrashAlt } from "react-icons/fa";
import PlantCard from "./displayCards/PlantCard";
import StageCard from "./displayCards/StageCard";
function DisplayCard({ data, contentType, showRemoveButton }) {
  return (
    <NavLink
      to={data.id ? `/${contentType}/${data.id}` : "/"}
      className="flex flex-row items-center flex-nowrap justify-between gap-2 p-4 text-text-50 bg-background-800 hover:bg-background-800/80 transition-colors rounded-sm shadow-sm w-full text-base relative"
    >
      {contentType === "cultivation" ? (
        <CultivationCard data={data} />
      ) : contentType === "worker" ? (
        <WorkerCard data={data} />
      ) : contentType === "stage" ? (
        <StageCard data={data} />
      ) : contentType === "plant" ? (
        <PlantCard data={data} />
      ) : contentType === "harvest" ? (
        <div>Harvest Card</div>
      ) : contentType === "station" ? (
        <StationCard data={data} />
      ) : contentType === "reading" ? (
        <div>Reading Card</div>
      ) : null}
      {showRemoveButton === true && (
        <CustomButton
          className={"h-full flex-nowrap"}
          onClick={(e) => {
            e.stopPropagation();
          }}
          variant={"action"}
        >
          <FaRegTrashAlt />
        </CustomButton>
      )}
    </NavLink>
  );
}

export default DisplayCard;
