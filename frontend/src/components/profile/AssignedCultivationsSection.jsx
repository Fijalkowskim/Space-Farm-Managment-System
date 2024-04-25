import React from "react";
import { useUserContext } from "../../context/UserContext";
import CultivationDisplay from "../cultivations/CultivationsDisplay";

function AssignedCultivationsSection() {
  const { getAssignedCultivations } = useUserContext();
  return (
    <CultivationDisplay
      className={
        "max-w-6xl rounded-md shadow-md items-start text-3xl max-h-[40rem] pt-2"
      }
      header="Assiged cultivations"
      cultivations={getAssignedCultivations()}
    />
  );
}

export default AssignedCultivationsSection;
