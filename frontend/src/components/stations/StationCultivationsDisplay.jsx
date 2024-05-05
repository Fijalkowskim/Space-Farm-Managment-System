import React from "react";
import VertivalScrollableDisplay from "../verticalScrollableDisplay/VertivalScrollableDisplay";

function StationCultivationsDisplay({ station }) {
  return (
    <div className="w-full p-2 flex flex-col items-center justify-start bg-background-950/50 h-[30rem] max-w-4xl">
      <VertivalScrollableDisplay
        header={"Assigned cultivations"}
        entries={station.cultivations}
        contentType={"cultivation"}
        className={""}
      />
    </div>
  );
}

export default StationCultivationsDisplay;
