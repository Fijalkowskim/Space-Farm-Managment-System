import React, { useState } from "react";
import PageWrapper from "../PageWrapper";
import { usePlantContext } from "../../context/dictionaries/PlantContext";
import VerticalScrollableDisplay from "../../components/verticalScrollableDisplay/VerticalScrollableDisplay";
import { useFetchArrayData } from "../../hooks/useFetchArrayData";
function Plants() {
  const { getPlants } = usePlantContext();
  const { data, isPending } = useFetchArrayData(getPlants);
  return (
    <PageWrapper secured={true}>
      <VerticalScrollableDisplay
        className={"max-w-4xl"}
        header="Plants"
        entries={data}
        contentType={"plant"}
        loading={isPending}
        dictionaryType={true}
      />
    </PageWrapper>
  );
}

export default Plants;
