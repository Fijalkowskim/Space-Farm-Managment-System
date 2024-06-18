import React from "react";
import DisplayCardAttribute from "../DisplayCardAttribute";
import { format } from "date-fns";

function StageCard({ data }) {
  return (
    <>
      <DisplayCardAttribute label="ID" value={data.id} />
      <DisplayCardAttribute label={`type`} value={data.stageType.name} />
      <DisplayCardAttribute
        label={`comment`}
        value={data.comment === "" ? "-" : data.commment}
      />
      <DisplayCardAttribute
        className="w-24"
        label="Start date"
        value={
          data.startStageDate
            ? format(data.startStageDate, "yyyy-MM-dd")
            : undefined
        }
      />
      <DisplayCardAttribute
        className="w-24"
        label="Finish date"
        value={
          data.finishStageDate
            ? format(data.finishStageDate, "yyyy-MM-dd")
            : undefined
        }
      />
    </>
  );
}

export default StageCard;
