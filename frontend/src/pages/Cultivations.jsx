import React from "react";
import PageWrapper from "./PageWrapper";
import {
  exampleCultivations,
  exampleFinishedCultivations,
} from "../exampleData/ExampleCultivations";
import CustomButton from "../components/general/CustomButton";
import VertivalScrollableDisplay from "../components/verticalScrollableDisplay/VertivalScrollableDisplay";
function Cultivations() {
  return (
    <PageWrapper
      secured={true}
      className="max-h-[90vh] h-screen min-h-0 overflow-hidden flex flex-col items-center justify-start gap-4 p-4"
    >
      <CustomButton className="text-lg w-44">New cultivation</CustomButton>
      <div className="flex flex-col gap-4 items-start justify-center w-full max-w-4xl h-full">
        <VertivalScrollableDisplay
          header={"Active cultivations"}
          entries={exampleCultivations}
          contentType={"cultivation"}
        />
        <VertivalScrollableDisplay
          header={"Finished cultivations"}
          entries={exampleFinishedCultivations}
          contentType={"cultivation"}
        />
      </div>
    </PageWrapper>
  );
}

export default Cultivations;
