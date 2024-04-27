import React from "react";
import DisplayCardAttribute from "../DisplayCardAttribute";

function WorkerCard({ data }) {
  if (data === null) return;
  return (
    <button className="flex flex-row md:flex-nowrap flex-wrap items-center justify-start gap-6 p-4 text-text-50 bg-background-800 hover:bg-background-800/80 transition-colors rounded-sm shadow-sm w-full max-w-3xl">
      <DisplayCardAttribute label="Id" value={data.id} />
      <DisplayCardAttribute
        label="Name"
        value={data.name + " " + data.surname}
        className={"w-40"}
      />
      <DisplayCardAttribute
        label="Role"
        value={data.role}
        className={"ml-auto w-28 items-end"}
      />
    </button>
  );
}

export default WorkerCard;
