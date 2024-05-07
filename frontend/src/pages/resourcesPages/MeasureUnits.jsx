import React, { useState } from "react";
import PageWrapper from "../PageWrapper";
import VertivalScrollableDisplay from "../../components/verticalScrollableDisplay/VertivalScrollableDisplay";
import { useFetchArrayData } from "../../hooks/useFetchArrayData";
import { useMeasureUnitContext } from "../../context/dictionaries/MeasureUnitContext";
function MeasureUnits() {
  const { getMeasureUnits } = useMeasureUnitContext();
  const { data, isPending } = useFetchArrayData(getMeasureUnits);
  return (
    <PageWrapper secured={true}>
      <VertivalScrollableDisplay
        className={"max-w-4xl"}
        header="Measure Units"
        entries={data}
        contentType={"measureUnit"}
        loading={isPending}
      />
    </PageWrapper>
  );
}

export default MeasureUnits;
