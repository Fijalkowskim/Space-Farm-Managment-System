import React from "react";
import { usePersonContext } from "../../context/PersonContext";
import VerticalScrollableDisplay from "../verticalScrollableDisplay/VerticalScrollableDisplay";
import { useAssignedCultivations } from "../../hooks/cultivations/useAssignedCultivations";

function AssignedCultivationsSection(worker) {
  const { cultivations, isPending } = useAssignedCultivations();
  return (
    <VerticalScrollableDisplay
      className={
        "w-full rounded-md shadow-md items-start text-3xl max-h-[40rem] pt-2"
      }
      header="Assiged cultivations"
      entries={cultivations}
      contentType={"cultivation"}
      loading={isPending}
      detailsPageDisplay={true}
    />
  );
}

export default AssignedCultivationsSection;
