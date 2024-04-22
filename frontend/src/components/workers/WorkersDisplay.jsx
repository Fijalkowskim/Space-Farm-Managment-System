import React, { useState } from "react";
import { exampleWorkers } from "../../exampleData/ExampleWorkers";
import WorkerCard from "./WorkerCard";

function WorkersDisplay() {
  const [workers, setWorkers] = useState(exampleWorkers);
  return (
    <div className="w-full bg-background-950/50 p-4 h-full overflow-x-hidden overflow-y-scroll max-w-4xl flex items-ccenter justify-start flex-col">
      <h1 className="text-center text-2xl">Workers</h1>
      <div className="flex flex-row flex-wrap gap-4 justify-center items-start w-full p-4 max-h-full">
        {workers.map((worker) => (
          <WorkerCard key={worker.id} workerData={worker} />
        ))}
      </div>
    </div>
  );
}

export default WorkersDisplay;
