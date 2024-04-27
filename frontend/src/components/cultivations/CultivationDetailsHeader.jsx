import React from "react";
import CultivationCardAttribute from "./CultivationCardAttribute";
import { format } from "date-fns";
import CultivationDetailsAttribute from "./CultivationDetailsAttribute";

function CultivationDetailsHeader({ cultivation }) {
  return (
    <div className="flex flex-col justify-center items-start w-full max-w-4xl bg-background-950/50 p-4 gap-2">
      <h1 className="text-3xl">Cultivation {cultivation.id}</h1>
      <div className="w-full flex flex-row items-center justify-center flex-wrap">
        <div className="flex flex-row md:flex-nowrap flex-wrap items-center justify-start gap-6 w-full">
          <CultivationDetailsAttribute
            label="Start date"
            value={format(cultivation.startDate, "yyyy-MM-dd")}
          />
          <CultivationDetailsAttribute
            label="Planned finish date"
            value={format(cultivation.plannedFinishDate, "yyyy-MM-dd")}
          />
          <CultivationDetailsAttribute
            label="Real finish date"
            value={
              cultivation.realFinishDate
                ? format(cultivation.realFinishDate, "yyyy-MM-dd")
                : "-"
            }
          />
          <CultivationDetailsAttribute
            label="Plant"
            value={cultivation.plant}
          />
          <CultivationDetailsAttribute label="Type" value={cultivation.type} />
          <CultivationDetailsAttribute
            label="Area"
            value={`${cultivation.area} ha`}
          />
        </div>
      </div>
      <CultivationDetailsAttribute
        label="Comment"
        value={cultivation.comment ?? "-"}
      />
    </div>
  );
}

export default CultivationDetailsHeader;
