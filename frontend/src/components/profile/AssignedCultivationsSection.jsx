import React from "react";
import { useUserContext } from "../../context/UserContext";
import VertivalScrollableDisplay from "../verticalScrollableDisplay/VertivalScrollableDisplay";
import { useAssignedCultivations } from "../../hooks/cultivations/useAssignedCultivations";

function AssignedCultivationsSection() {
  const { cultivations } = useAssignedCultivations();
  if (cultivations === undefined) return;
  return (
    <>
      {
        <VertivalScrollableDisplay
          className={
            "w-full rounded-md shadow-md items-start text-3xl max-h-[40rem] pt-2"
          }
          header="Assiged cultivations"
          entries={cultivations}
          contentType={"cultivation"}
        />
      }
    </>
  );
}

export default AssignedCultivationsSection;
