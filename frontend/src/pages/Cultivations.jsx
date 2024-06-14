import React from "react";
import PageWrapper from "./PageWrapper";
import VerticalScrollableDisplay from "../components/verticalScrollableDisplay/VerticalScrollableDisplay";
import { useFetchArrayData } from "../hooks/useFetchArrayData";
import { useCultivationContext } from "../context/cultivations/CultivationContext";
function Cultivations() {
  const { getActiveCultivations, getFinishedCultivations } =
    useCultivationContext();
  const { data: activeCultivations, isPending: activeCultPending } =
    useFetchArrayData(getActiveCultivations);
  const { data: finishedCultivations, isPending: finishedCultPending } =
    useFetchArrayData(getFinishedCultivations);
  return (
    <PageWrapper
      secured={true}
      className="max-h-[90vh] h-screen min-h-0 overflow-hidden flex flex-col items-center justify-start gap-4 p-4"
    >
      <div className="flex flex-col gap-4 items-start justify-center w-full max-w-4xl h-full">
        <VerticalScrollableDisplay
          header={"Active cultivations"}
          entries={activeCultivations}
          contentType={"cultivation"}
          loading={activeCultPending}
        />
        <VerticalScrollableDisplay
          header={"Finished cultivations"}
          entries={finishedCultivations}
          contentType={"cultivation"}
          loading={finishedCultPending}
          disableCreateButton={true}
        />
      </div>
    </PageWrapper>
  );
}

export default Cultivations;
