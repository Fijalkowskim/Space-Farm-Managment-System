import React, { useState } from "react";
import PageWrapper from "../PageWrapper";
import VerticalScrollableDisplay from "../../components/verticalScrollableDisplay/VerticalScrollableDisplay";
import { useFetchArrayData } from "../../hooks/useFetchArrayData";
import { useMeasureUnitContext } from "../../context/dictionaries/MeasureUnitContext";
function MeasureUnits() {
  const { getMeasureUnits } = useMeasureUnitContext();
  const { data, isPending } = useFetchArrayData(getMeasureUnits);
  return (
    <PageWrapper secured={true}>
      <VerticalScrollableDisplay
        className={"max-w-4xl"}
        header="Measure Units"
        entries={data}
        contentType={"measureUnit"}
        loading={isPending}
        dictionaryType={true}
      />
    </PageWrapper>
  );
}

export default MeasureUnits;
