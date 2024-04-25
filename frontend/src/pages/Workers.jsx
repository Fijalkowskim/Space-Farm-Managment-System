import React from "react";
import PageWrapper from "./PageWrapper";
import CustomButton from "../components/general/CustomButton";
import WorkersDisplay from "../components/workers/WorkersDisplay";

function Workers() {
  return (
    <PageWrapper
      secured={true}
      className="max-h-[90vh] h-screen min-h-0 overflow-hidden flex flex-col items-center justify-start gap-4 p-4"
    >
      <CustomButton className="text-lg w-44">New worker</CustomButton>
      <WorkersDisplay />
    </PageWrapper>
  );
}

export default Workers;
