import React from "react";
import PageWrapper from "./PageWrapper";
import CultivationsDisplay from "../components/cultivations/CultivationsDisplay";
import { exampleCultivations } from "../exampleData/ExampleCultivations";
import CustomButton from "../components/general/CustomButton";
function Cultivations() {
  return (
    <PageWrapper
      secured={true}
      className="max-h-[90vh] h-screen min-h-0 overflow-hidden flex flex-col items-center justify-start gap-4 p-4"
    >
      <CustomButton className="text-lg">New cultivation</CustomButton>
      <div className="flex flex-row gap-10 items-start justify-center w-full max-w-6xl h-full">
        <CultivationsDisplay
          header="Active cultivations"
          cultivations={exampleCultivations}
        />
        <CultivationsDisplay
          header="Finished cultivations"
          cultivations={exampleCultivations}
        />
      </div>
    </PageWrapper>
  );
}

export default Cultivations;
