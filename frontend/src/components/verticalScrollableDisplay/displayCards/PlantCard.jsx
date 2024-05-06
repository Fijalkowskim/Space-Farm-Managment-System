import React from "react";
import DisplayCardAttribute from "../DisplayCardAttribute";

function PlantCard({ data }) {
  return (
    <>
      <DisplayCardAttribute label="ID" value={data.id} />
      <DisplayCardAttribute
        label={`Name`}
        value={data.name}
        className={"ml-auto items-end"}
      />
    </>
  );
}

export default PlantCard;
