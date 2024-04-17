import React from "react";
import { format } from "date-fns";
function CultivationCard({ cultivationData }) {
  if (cultivationData === null) return;
  return (
    <div className="flex flex-row items-center justify-start gap-2 p-2 text-text-50 bg-background-800 rounded-sm shadow-sm w-full max-w-3xl">
      <p>{format(cultivationData.startDate, "yyyy-MM-dd")}</p>
      <p>{cultivationData.type}</p>
      <p>
        {cultivationData.plants.map(
          (plant, idx) => `${idx !== 0 ? `, ` : ``}${plant}`
        )}
      </p>
    </div>
  );
}

export default CultivationCard;
