import React from "react";
import WorkerCardAttribute from "./WorkerCardAttribute";

function WorkerCard({ workerData }) {
  if (workerData === null) return;
  return (
    <button className="flex flex-row md:flex-nowrap flex-wrap items-center justify-start gap-6 p-4 text-text-50 bg-background-800 hover:bg-background-800/80 transition-colors rounded-sm shadow-sm w-full max-w-3xl">
      <WorkerCardAttribute label="Id" value={workerData.id} />
      <WorkerCardAttribute
        label="Name"
        value={workerData.name + " " + workerData.surname}
        className={"w-40"}
      />
      <WorkerCardAttribute
        label="Role"
        value={workerData.role}
        className={"w-24"}
      />
      <WorkerCardAttribute
        label="Cultivations"
        value={workerData.cultivations.length}
      />
    </button>
  );
}

export default WorkerCard;
