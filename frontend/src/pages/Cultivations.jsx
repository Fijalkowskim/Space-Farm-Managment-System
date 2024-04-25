import React from "react";
import PageWrapper from "./PageWrapper";
import CultivationsDisplay from "../components/cultivations/CultivationsDisplay";
import {
  exampleCultivations,
  exampleFinishedCultivations,
} from "../exampleData/ExampleCultivations";
import CustomButton from "../components/general/CustomButton";
function Cultivations() {
  return (
    <PageWrapper
      secured={true}
      className="max-h-[90vh] h-screen min-h-0 overflow-hidden flex flex-col items-center justify-start gap-4 p-4"
    >
      <CustomButton className="text-lg w-44">New cultivation</CustomButton>
      <div className="flex flex-col gap-4 items-start justify-center w-full max-w-4xl h-full">
        <CultivationsDisplay
          header="Active cultivations"
          cultivations={exampleCultivations}
        />
        <CultivationsDisplay
          header="Finished cultivations"
          cultivations={exampleFinishedCultivations}
        />
      </div>
    </PageWrapper>
  );
}

export default Cultivations;
