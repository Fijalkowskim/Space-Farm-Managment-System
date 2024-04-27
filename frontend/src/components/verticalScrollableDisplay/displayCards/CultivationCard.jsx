import React from "react";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";
import DisplayCardAttribute from "../DisplayCardAttribute";
function CultivationCard({ data }) {
  const finished = data.realFinishDate !== undefined;
  if (data === null) return;
  return (
    <NavLink
      to={`/cultivation/${data.id}`}
      className="flex flex-col items-center justify-center gap-1 p-4 text-text-50 bg-background-800 hover:bg-background-800/80 transition-colors rounded-sm shadow-sm w-full text-base"
    >
      <div className="flex flex-row md:flex-nowrap flex-wrap items-center justify-start gap-6 w-full">
        <DisplayCardAttribute
          className="w-36"
          label="Start date"
          value={format(data.startDate, "yyyy-MM-dd")}
        />
        <DisplayCardAttribute label="Id" value={data.id} />
        <DisplayCardAttribute label="Plant" value={data.plant} />
      </div>
      <div className="flex flex-row md:flex-nowrap flex-wrap items-center justify-start gap-6 w-full">
        <DisplayCardAttribute
          className="w-36"
          label={finished ? "Finish date" : "Planned finish date"}
          value={format(
            finished ? data.realFinishDate : data.plannedFinishDate,
            "yyyy-MM-dd"
          )}
        />
        <DisplayCardAttribute label="Type" value={data.type} />
        <DisplayCardAttribute label="Area" value={`${data.area} ha`} />
      </div>
    </NavLink>
  );
}

export default CultivationCard;
