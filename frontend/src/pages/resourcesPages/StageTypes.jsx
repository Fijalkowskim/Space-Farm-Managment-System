import React, { useState } from "react";
import PageWrapper from "../PageWrapper";
import { usePlantContext } from "../../context/dictionaries/PlantContext";
import VertivalScrollableDisplay from "../../components/verticalScrollableDisplay/VertivalScrollableDisplay";
import { useFetchArrayData } from "../../hooks/useFetchArrayData";
import { useStageTypeContext } from "../../context/dictionaries/StageTypeContext";
function StageTypes() {
  const { getStageTypes } = useStageTypeContext();
  const { data, isPending } = useFetchArrayData(getStageTypes);
  return (
    <PageWrapper secured={true}>
      <VertivalScrollableDisplay
        className={"max-w-4xl"}
        header="Stage Types"
        entries={data}
        contentType={"stageType"}
        loading={isPending}
      />
    </PageWrapper>
  );
}

export default StageTypes;
