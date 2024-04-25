import React from "react";
import CultivationCard from "./CultivationCard";
import { cn } from "../../helpers/helpers";

function CultivationsDisplay({ header, cultivations, className }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 justify-start items-center w-full flex-1 bg-background-950/50 p-4 h-full overflow-x-hidden overflow-y-scroll text-2xl",
        className
      )}
    >
      <h1 className="mt-4">{header}</h1>
      {cultivations.map((cultivation) => (
        <CultivationCard key={cultivation.id} cultivationData={cultivation} />
      ))}
    </div>
  );
}

export default CultivationsDisplay;
