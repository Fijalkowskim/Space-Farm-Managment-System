import React, { useState } from "react";
import PageWrapper from "../PageWrapper";
import VerticalScrollableDisplay from "../../components/verticalScrollableDisplay/VerticalScrollableDisplay";
import { useFetchArrayData } from "../../hooks/useFetchArrayData";
import { useCultivationTypeContext } from "../../context/dictionaries/CultivationTypeContext";
function CultivationTypes() {
  const { getCultivationTypes } = useCultivationTypeContext();
  const { data, isPending } = useFetchArrayData(getCultivationTypes);
  return (
    <PageWrapper secured={true}>
      <VerticalScrollableDisplay
        className={"max-w-4xl"}
        header="Cultivation Types"
        entries={data}
        contentType={"cultivationType"}
        loading={isPending}
      />
    </PageWrapper>
  );
}

export default CultivationTypes;
