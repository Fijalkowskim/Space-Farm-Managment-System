import React from "react";
import PageWrapper from "../PageWrapper";
import { useParams } from "react-router-dom";
import { useCultivationContext } from "../../context/CultivationContext";

function CultivationDetails() {
  const { id } = useParams();
  const { getCultivation } = useCultivationContext();
  cons;
  return <PageWrapper secured={true}>{id}</PageWrapper>;
}

export default CultivationDetails;
