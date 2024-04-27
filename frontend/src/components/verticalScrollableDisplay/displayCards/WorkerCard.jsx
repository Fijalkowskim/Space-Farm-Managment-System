import React from "react";
import DisplayCardAttribute from "../DisplayCardAttribute";

function WorkerCard({ data }) {
  if (data === null) return;
  return (
    <>
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
    </>
  );
}

export default WorkerCard;
