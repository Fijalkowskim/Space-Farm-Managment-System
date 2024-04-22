import React from "react";
import StationCardAttribute from "./StationCardAttribute";

function StationCard({ stationData }) {
  return (
    <button className="flex flex-col items-center justify-center gap-2 p-4 text-text-50 bg-background-800 hover:bg-background-800/80 transition-colors rounded-sm shadow-sm w-80">
      <StationCardAttribute
        label="Station ID"
        value={stationData.id}
        className={"text-2xl"}
      />
      <StationCardAttribute
        label={`Number of cultivations`}
        value={stationData.cultivations.length}
      />
    </button>
  );
}

export default StationCard;
