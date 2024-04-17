import React, { useState } from "react";
import { exampleCultivations } from "../../exampleData/ExampleCultivations";
import CultivationCard from "./cultivationCard/CultivationCard";

function CultivationsDisplay() {
  const [cultivations, setCultivations] = useState(exampleCultivations);
  return (
    <div className="flex flex-col gap-4 justify-start items-center w-full">
      <h1 className="mt-4 text-2xl">Active cultivations</h1>
      {cultivations.map((cultivation) => (
        <CultivationCard key={cultivation.id} cultivationData={cultivation} />
      ))}
    </div>
  );
}

export default CultivationsDisplay;
