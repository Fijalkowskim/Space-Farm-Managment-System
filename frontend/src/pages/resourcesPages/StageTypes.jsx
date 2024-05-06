import React, { useState } from "react";
import PageWrapper from "../PageWrapper";
import { usePlantContext } from "../../context/PlantContext";
import VertivalScrollableDisplay from "../../components/verticalScrollableDisplay/VertivalScrollableDisplay";
import { useFetchArrayData } from "../../hooks/useFetchArrayData";
import { useStageContext } from "../../context/StageContext";
function StageTypes() {
  const { getStages } = useStageContext();
  const { data, isPending } = useFetchArrayData(getStages);
  return (
    <PageWrapper secured={true}>
      <VertivalScrollableDisplay
        className={"max-w-4xl"}
        header="Stages"
        entries={data}
        contentType={"stage"}
        loading={isPending}
      />
    </PageWrapper>
  );
}

export default StageTypes;
