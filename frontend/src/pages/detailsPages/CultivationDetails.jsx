import React, { useState } from "react";
import PageWrapper from "../PageWrapper";
import { useParams } from "react-router-dom";
import { useCultivation } from "../../hooks/useCultivation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function CultivationDetails() {
  const { id } = useParams();
  const { cultivation, isPending } = useCultivation(id);
  return (
    <PageWrapper secured={true} className={"h-fit min-h-0"}>
      {cultivation === undefined && !isPending ? (
        <div className="-mt-20 h-screen flex items-center justify-center">
          <h1 className="text-xl text-center">
            There is no cultivation with given id.
          </h1>
        </div>
      ) : isPending ? (
        <div className="-mt-20 animate-spin h-screen flex items-center justify-center text-2xl">
          <AiOutlineLoading3Quarters />
        </div>
      ) : (
        <></>
      )}
    </PageWrapper>
  );
}

export default CultivationDetails;
