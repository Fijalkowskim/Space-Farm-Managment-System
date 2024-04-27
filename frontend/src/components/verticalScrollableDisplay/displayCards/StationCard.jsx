import React from "react";
import DisplayCardAttribute from "../DisplayCardAttribute";

function StationCard({ data }) {
  return (
    <>
      <DisplayCardAttribute label="Station ID" value={data.id} />
      <DisplayCardAttribute
        label={`Number of cultivations`}
        value={data.cultivations.length}
        className={"ml-auto items-end"}
      />
    </>
  );
}

export default StationCard;
