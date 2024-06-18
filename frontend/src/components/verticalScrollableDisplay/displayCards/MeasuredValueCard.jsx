import React from "react";
import DisplayCardAttribute from "../DisplayCardAttribute";

function MeasuredValueCard({ data }) {
  return (
    <>
      <DisplayCardAttribute label="ID" value={data.id} />
      <DisplayCardAttribute label={`Name`} value={data.name} />
      <DisplayCardAttribute
        label={`Unit`}
        value={data.measureUnit?.name}
        className={"ml-auto items-end"}
      />
    </>
  );
}

export default MeasuredValueCard;
