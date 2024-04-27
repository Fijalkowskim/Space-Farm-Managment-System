import React from "react";
import PageWrapper from "./PageWrapper";
import CustomButton from "../components/general/CustomButton";
import VertivalScrollableDisplay from "../components/verticalScrollableDisplay/VertivalScrollableDisplay";
import { exampleWorkers } from "../exampleData/ExampleWorkers";

function Workers() {
  return (
    <PageWrapper
      secured={true}
      className="max-h-[90vh] h-screen min-h-0 overflow-hidden flex flex-col items-center justify-start gap-4 p-4"
    >
      <CustomButton className="text-lg w-44">New worker</CustomButton>
      <VertivalScrollableDisplay
        header={"Workers"}
        entries={exampleWorkers}
        contentType={"worker"}
        className={"max-w-4xl"}
      />
    </PageWrapper>
  );
}

export default Workers;
