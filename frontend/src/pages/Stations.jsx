import React from "react";
import PageWrapper from "./PageWrapper";
import StationsDisplay from "../components/stations/StationsDisplay";
import CustomButton from "../components/general/CustomButton";

function Stations() {
  return (
    <PageWrapper
      secured={true}
      className="max-h-[90vh] h-screen min-h-0 overflow-hidden flex flex-col items-center justify-start gap-4 p-4"
    >
      <CustomButton className="text-lg">New station</CustomButton>
      <StationsDisplay />
    </PageWrapper>
  );
}

export default Stations;
