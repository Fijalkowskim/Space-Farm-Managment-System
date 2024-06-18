import React from "react";
import DisplayCardAttribute from "../DisplayCardAttribute";
import { format } from "date-fns";

function ReadingCard({ data }) {
  return (
    <>
      <DisplayCardAttribute label="ID" value={data.id} />
      <DisplayCardAttribute
        label="Measured value"
        value={data.measuredValue?.name}
      />
      <DisplayCardAttribute label="Value" value={data.value} />
    </>
  );
}
export default ReadingCard;
