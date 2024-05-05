import React from "react";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";
import DisplayCardAttribute from "../DisplayCardAttribute";
function CultivationCard({ data }) {
  const finished = data.realFinishDate !== undefined;
  if (data === null) return;
  return (
    <div className="flex flex-row md:flex-nowrap flex-wrap items-center justify-start gap-6 w-full">
      <DisplayCardAttribute label="Id" value={data.id} />
      <DisplayCardAttribute
        className="w-24"
        label="Start date"
        value={format(data.startDate, "yyyy-MM-dd")}
      />
      <DisplayCardAttribute
        className="w-36"
        label={finished ? "Finish date" : "Planned finish date"}
        value={format(
          finished ? data.realFinishDate : data.plannedFinishDate,
          "yyyy-MM-dd"
        )}
      />

      <DisplayCardAttribute label="Plant" value={data.plant} />
      <DisplayCardAttribute label="Type" value={data.type} />
      <DisplayCardAttribute label="Area" value={`${data.area} ha`} />
      <DisplayCardAttribute label="Comment" value={data.comment ?? "-"} />
    </div>
  );
}

export default CultivationCard;
