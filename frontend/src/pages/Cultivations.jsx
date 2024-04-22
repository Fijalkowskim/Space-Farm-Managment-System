import React from "react";
import PageWrapper from "./PageWrapper";
import CultivationsDisplay from "../components/cultivations/CultivationsDisplay";

function Cultivations() {
  return (
    <PageWrapper secured={true}>
      <CultivationsDisplay />
    </PageWrapper>
  );
}

export default Cultivations;
