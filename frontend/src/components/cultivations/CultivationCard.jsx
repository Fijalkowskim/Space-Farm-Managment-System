import React from "react";
import { format } from "date-fns";
import CultivationCardAttribute from "./CultivationCardAttribute";
import { NavLink } from "react-router-dom";
function CultivationCard({ cultivationData }) {
  const finished = cultivationData.realFinishDate !== undefined;
  if (cultivationData === null) return;
  return (
    <NavLink
      to={`/cultivation/${cultivationData.id}`}
      className="flex flex-col items-center justify-center gap-1 p-4 text-text-50 bg-background-800 hover:bg-background-800/80 transition-colors rounded-sm shadow-sm w-full text-base"
    >
      <div className="flex flex-row md:flex-nowrap flex-wrap items-center justify-start gap-6 w-full">
        <CultivationCardAttribute
          className="w-36"
          label="Start date"
          value={format(cultivationData.startDate, "yyyy-MM-dd")}
        />
        <CultivationCardAttribute
          label="Type"
          value={cultivationData.type}
          className="w-16"
        />
        <CultivationCardAttribute
          label="Plants"
          value={cultivationData.plants.map(
            (plant, idx) => `${idx !== 0 ? `, ` : ``}${plant}`
          )}
        />
      </div>
      <div className="flex flex-row md:flex-nowrap flex-wrap items-center justify-start gap-6 w-full">
        <CultivationCardAttribute
          className="w-36"
          label={finished ? "Finish date" : "Planned finish date"}
          value={format(
            finished
              ? cultivationData.realFinishDate
              : cultivationData.plannedFinishDate,
            "yyyy-MM-dd"
          )}
        />
        <CultivationCardAttribute
          label="Area"
          value={`${cultivationData.area} ha`}
          className="w-16"
        />
        <CultivationCardAttribute
          label="Comment"
          value={cultivationData.comment ?? "-"}
        />
      </div>
    </NavLink>
  );
}

export default CultivationCard;
