import React, { useState } from "react";
import { exampleCultivations } from "../../exampleData/ExampleCultivations";
import CultivationCard from "./CultivationCard";

function CultivationsDisplay() {
  const [cultivations, setCultivations] = useState(exampleCultivations);
  return (
    <div className="flex flex-col gap-2 justify-start items-center w-full">
      {cultivations.map((cultivation) => (
        <CultivationCard key={cultivation.id} cultivationData={cultivation} />
      ))}
    </div>
  );
}

export default CultivationsDisplay;
