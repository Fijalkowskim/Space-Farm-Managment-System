import React, { useState } from "react";
import PageWrapper from "../PageWrapper";
import { usePlantContext } from "../../context/PlantContext";
import VertivalScrollableDisplay from "../../components/verticalScrollableDisplay/VertivalScrollableDisplay";
import { useFetchArrayData } from "../../hooks/useFetchArrayData";
function Plants() {
  const { getPlants } = usePlantContext();
  const { data, isPending } = useFetchArrayData(getPlants);
  return (
    <PageWrapper secured={true}>
      <VertivalScrollableDisplay
        className={"max-w-4xl"}
        header="Plants"
        entries={data}
        contentType={"plant"}
        loading={isPending}
      />
    </PageWrapper>
  );
}

export default Plants;
