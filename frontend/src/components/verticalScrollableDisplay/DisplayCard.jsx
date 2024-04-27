import React from "react";
import CultivationCard from "./displayCards/CultivationCard";
import WorkerCard from "./displayCards/WorkerCard";

function DisplayCard({ data, contentType }) {
  return contentType === "cultivation" ? (
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
    <div>Station Card</div>
  ) : contentType === "reading" ? (
    <div>Reading Card</div>
  ) : null;
}

export default DisplayCard;
