import React from "react";
import { useUserContext } from "../../context/UserContext";
import VertivalScrollableDisplay from "../verticalScrollableDisplay/VertivalScrollableDisplay";

function AssignedCultivationsSection() {
  const { getAssignedCultivations } = useUserContext();
  return (
    <VertivalScrollableDisplay
      className={
        "w-full rounded-md shadow-md items-start text-3xl max-h-[40rem] pt-2"
      }
      header="Assiged cultivations"
      entries={getAssignedCultivations()}
      contentType={"cultivation"}
    />
  );
}

export default AssignedCultivationsSection;
