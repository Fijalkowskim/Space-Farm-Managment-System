import React, { useState } from "react";
import StationCard from "./StationCard";
import { exampleStations } from "../../exampleData/ExampleStations";

function StationsDisplay() {
  const [stations, setStations] = useState(exampleStations);
  return (
    <div className="w-full bg-background-950/50 p-4 h-full overflow-x-hidden overflow-y-scroll max-w-4xl flex items-ccenter justify-start flex-col">
      <h1 className="text-center text-2xl">Active stations</h1>
      <div className="flex flex-row flex-wrap gap-4 justify-center items-start w-full p-4 max-h-full">
        {stations.map((station) => (
          <StationCard key={station.id} stationData={station} />
        ))}
      </div>
    </div>
  );
}

export default StationsDisplay;
