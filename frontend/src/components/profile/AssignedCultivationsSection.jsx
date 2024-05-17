import React from "react";
import { usePersonContext } from "../../context/PersonContext";
import VertivalScrollableDisplay from "../verticalScrollableDisplay/VertivalScrollableDisplay";
import { useAssignedCultivations } from "../../hooks/cultivations/useAssignedCultivations";

function AssignedCultivationsSection() {
  const { cultivations, isPending } = useAssignedCultivations();
  return (
    <VertivalScrollableDisplay
      className={
        "w-full rounded-md shadow-md items-start text-3xl max-h-[40rem] pt-2"
      }
      header="Assiged cultivations"
      entries={cultivations}
      contentType={"cultivation"}
      loading={isPending}
    />
  );
}

export default AssignedCultivationsSection;
