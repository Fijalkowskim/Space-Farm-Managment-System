import React from "react";
import VerticalScrollableDisplay from "../verticalScrollableDisplay/VerticalScrollableDisplay";
import { useCultivationContext } from "../../context/cultivations/CultivationContext";
import { useFetchArrayData } from "../../hooks/useFetchArrayData";

function AssignedCultivationsSection() {
  const { getAssignedCultivations } = useCultivationContext();
  const { data, isPending } = useFetchArrayData(getAssignedCultivations);
  return (
    <VerticalScrollableDisplay
      className={
        "w-full rounded-md shadow-md items-start text-3xl max-h-[40rem] pt-2"
      }
      header="Assiged cultivations"
      entries={data}
      contentType={"cultivation"}
      loading={isPending}
      detailsPageDisplay={true}
      disableCreateButton={true}
    />
  );
}

export default AssignedCultivationsSection;
