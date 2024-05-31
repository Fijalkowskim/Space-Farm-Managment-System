import React from "react";
import PageWrapper from "./PageWrapper";
import CustomButton from "../components/general/CustomButton";
import VerticalScrollableDisplay from "../components/verticalScrollableDisplay/VerticalScrollableDisplay";
import { useCultivations } from "../hooks/cultivations/useCultivations";
function Cultivations() {
  const { activeCultivations, finishedCultivations, isPending } =
    useCultivations();
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
          loading={isPending}
        />
        <VerticalScrollableDisplay
          header={"Finished cultivations"}
          entries={finishedCultivations}
          contentType={"cultivation"}
          loading={isPending}
          disableCreateButton={true}
        />
      </div>
    </PageWrapper>
  );
}

export default Cultivations;
