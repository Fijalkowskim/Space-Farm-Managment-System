import React from "react";
import DisplayCardAttribute from "../DisplayCardAttribute";
import { format } from "date-fns";

function ControlCard({ data }) {
  return (
    <>
      <DisplayCardAttribute label="ID" value={data.id} />
      <DisplayCardAttribute
        className="w-24"
        label="Control date"
        value={
          data.controlDate ? format(data.controlDate, "yyyy-MM-dd") : undefined
        }
      />
      <DisplayCardAttribute label="Dead seedlings" value={data.deadSeedlings} />
    </>
  );
}
export default ControlCard;
