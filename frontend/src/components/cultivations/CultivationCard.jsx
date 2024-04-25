import React from "react";
import { format } from "date-fns";
import CultivationCardAttribute from "./CultivationCardAttribute";
function CultivationCard({ cultivationData }) {
  if (cultivationData === null) return;
  return (
    <button className="flex flex-row items-center justify-start gap-6 p-4 text-text-50 bg-background-800 hover:bg-background-800/80 transition-colors rounded-sm shadow-sm w-full max-w-3xl text-base">
      <CultivationCardAttribute
        label="Start date"
        value={format(cultivationData.startDate, "yyyy-MM-dd")}
      />
      <CultivationCardAttribute label="Type" value={cultivationData.type} />
      <CultivationCardAttribute
        label="Plants"
        value={cultivationData.plants.map(
          (plant, idx) => `${idx !== 0 ? `, ` : ``}${plant}`
        )}
      />
    </button>
  );
}

export default CultivationCard;
