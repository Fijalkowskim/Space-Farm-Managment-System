import React from "react";
import VerticalScrollableDisplay from "../verticalScrollableDisplay/VerticalScrollableDisplay";

function StationCultivationsDisplay({ station }) {
  return (
    <div className="w-full p-2 flex flex-col items-center justify-start bg-background-950/50 h-[30rem] max-w-4xl">
      <VerticalScrollableDisplay
        header={"Assigned cultivations"}
        entries={station.cultivations}
        contentType={"cultivation"}
        className={""}
        detailsPageDisplay={true}
      />
    </div>
  );
}

export default StationCultivationsDisplay;
