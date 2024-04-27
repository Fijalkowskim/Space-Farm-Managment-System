import React from "react";
import CultivationCard from "./displayCards/CultivationCard";
import WorkerCard from "./displayCards/WorkerCard";
import { NavLink } from "react-router-dom";
import StationCard from "./displayCards/StationCard";

function DisplayCard({ data, contentType }) {
  return (
    <NavLink
      to={data.id ? `${contentType}/${data.id}` : "/"}
      className="flex flex-row items-center flex-wrap justify-start gap-2 p-4 text-text-50 bg-background-800 hover:bg-background-800/80 transition-colors rounded-sm shadow-sm w-full text-base"
    >
      {contentType === "cultivation" ? (
        <CultivationCard data={data} />
      ) : contentType === "worker" ? (
        <WorkerCard data={data} />
      ) : contentType === "stage" ? (
        <div>Stage Card</div>
      ) : contentType === "plant" ? (
        <div>Plant Card</div>
      ) : contentType === "harvest" ? (
        <div>Harvest Card</div>
      ) : contentType === "station" ? (
        <StationCard data={data} />
      ) : contentType === "reading" ? (
        <div>Reading Card</div>
      ) : null}
    </NavLink>
  );
}

export default DisplayCard;
