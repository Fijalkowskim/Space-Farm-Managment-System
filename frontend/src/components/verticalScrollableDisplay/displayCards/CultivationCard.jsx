import React from "react";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";
import DisplayCardAttribute from "../DisplayCardAttribute";
function CultivationCard({ data }) {
  const finished =
    data.realFinishDate !== undefined &&
    new Date(data.realFinishDate) <= new Date();
  if (data === null) return;
  return (
    <div className="flex flex-row md:flex-nowrap flex-wrap items-center justify-start gap-6 w-full">
      <DisplayCardAttribute label="Id" value={data.id} />
      <DisplayCardAttribute
        className="w-24"
        label="Start date"
        value={
          data.startDate ? format(data.startDate, "yyyy-MM-dd") : undefined
        }
      />
      <DisplayCardAttribute
        className="w-36"
        label={finished ? "Finish date" : "Planned finish date"}
        value={
          finished && data.realFinishDate
            ? format(data.realFinishDate, "yyyy-MM-dd")
            : !finished && data.plannedFinishDate
            ? format(data.plannedFinishDate, "yyyy-MM-dd")
            : undefined
        }
      />

      <DisplayCardAttribute label="Plant" value={data.plant.name} />
      <DisplayCardAttribute label="Type" value={data.type.name} />
      <DisplayCardAttribute label="Area" value={`${data.area} ha`} />
      <DisplayCardAttribute label="Comment" value={data.comment ?? "-"} />
    </div>
  );
}

export default CultivationCard;
