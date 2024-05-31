import React, { useEffect } from "react";
import VerticalScrollableDisplay from "../verticalScrollableDisplay/VerticalScrollableDisplay";

function PlantCultivationsDisplay({ plant }) {
  if (plant === undefined) return;
  return (
    <div className="w-full p-2 flex flex-col items-center justify-start bg-background-950/50 h-[30rem] max-w-4xl">
      <VerticalScrollableDisplay
        header={"Assigned cultivations"}
        entries={plant.cultivations}
        contentType={"cultivation"}
        className={""}
        detailsPageDisplay={true}
      />
    </div>
  );
}

export default PlantCultivationsDisplay;
