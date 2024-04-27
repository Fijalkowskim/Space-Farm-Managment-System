import React from "react";
import PageWrapper from "./PageWrapper";
import CustomButton from "../components/general/CustomButton";
import VertivalScrollableDisplay from "../components/verticalScrollableDisplay/VertivalScrollableDisplay";
import { exampleStations } from "../exampleData/ExampleStations";
function Stations() {
  return (
    <PageWrapper
      secured={true}
      className="max-h-[90vh] h-screen min-h-0 overflow-hidden flex flex-col items-center justify-start gap-4 p-4"
    >
      <CustomButton className="text-lg w-44">New station</CustomButton>
      <VertivalScrollableDisplay
        header={"Stations"}
        entries={exampleStations}
        contentType={"station"}
        className={"max-w-4xl"}
      />
    </PageWrapper>
  );
}

export default Stations;
