import React, { useState } from "react";
import PageWrapper from "../PageWrapper";
import { usePlantContext } from "../../context/dictionaries/PlantContext";
import VerticalScrollableDisplay from "../../components/verticalScrollableDisplay/VerticalScrollableDisplay";
import { useFetchArrayData } from "../../hooks/useFetchArrayData";
import { useStageTypeContext } from "../../context/dictionaries/StageTypeContext";
function StageTypes() {
  const { getStageTypes } = useStageTypeContext();
  const { data, isPending } = useFetchArrayData(getStageTypes);
  return (
    <PageWrapper secured={true}>
      <VerticalScrollableDisplay
        className={"max-w-4xl"}
        header="Stage Types"
        entries={data}
        contentType={"stageType"}
        loading={isPending}
        dictionaryType={true}
      />
    </PageWrapper>
  );
}

export default StageTypes;
