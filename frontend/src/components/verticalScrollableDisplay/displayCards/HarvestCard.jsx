import React from "react";
import DisplayCardAttribute from "../DisplayCardAttribute";
import { format } from "date-fns";

function HarvestCard({ data }) {
  return (
    <>
      <DisplayCardAttribute label="ID" value={data.id} />
      <DisplayCardAttribute
        label={`Date`}
        value={
          data.harvestDate ? format(data.harvestDate, "yyyy-MM-dd") : undefined
        }
      />
      <DisplayCardAttribute
        label={`Successfull`}
        value={data.successfulHarvest}
        bool={true}
      />
      <DisplayCardAttribute label={`Comment`} value={data.comment} />
    </>
  );
}

export default HarvestCard;
