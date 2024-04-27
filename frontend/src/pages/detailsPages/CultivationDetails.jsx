import React from "react";
import PageWrapper from "../PageWrapper";
import { useParams } from "react-router-dom";

function CultivationDetails() {
  const { id } = useParams();

  return <PageWrapper secured={true}>{id}</PageWrapper>;
}

export default CultivationDetails;
