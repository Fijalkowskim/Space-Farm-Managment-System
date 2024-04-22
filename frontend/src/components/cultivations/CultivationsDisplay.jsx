import React from "react";
import CultivationCard from "./cultivationCard/CultivationCard";

function CultivationsDisplay({ header, cultivations }) {
  return (
    <div className="flex flex-col gap-4 justify-start items-center w-full flex-1 bg-background-950/50 p-4 h-full overflow-x-hidden overflow-y-scroll">
      <h1 className="mt-4 text-2xl">{header}</h1>
      {cultivations.map((cultivation) => (
        <CultivationCard key={cultivation.id} cultivationData={cultivation} />
      ))}
    </div>
  );
}

export default CultivationsDisplay;
