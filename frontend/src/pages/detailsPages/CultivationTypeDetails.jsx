import React, { useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import { useParams } from "react-router-dom";
import LoadingBar from "../../components/general/LoadingBar";
import { useFetchData } from "../../hooks/useFetchData";
import { useCultivationTypeContext } from "../../context/dictionaries/CultivationTypeContext";
import VerticalScrollableDisplay from "../../components/verticalScrollableDisplay/VerticalScrollableDisplay";

function CultivationTypeDetails() {
  const { id } = useParams();
  const { getCultivationType } = useCultivationTypeContext();
  const { data, isPending } = useFetchData(getCultivationType, id);
  const [currentCultivationType, setCurrentCultivationType] =
    useState(undefined);

  useEffect(() => {
    setCurrentCultivationType(data);
  }, [data, setCurrentCultivationType]);

  return (
    <PageWrapper secured={true} className={"h-fit min-h-0"}>
      {currentCultivationType === undefined && !isPending ? (
        <div className="-mt-20 h-screen flex items-center justify-center">
          <h1 className="text-xl text-center">
            There is no cultivation type with given id.
          </h1>
        </div>
      ) : isPending ? (
        <LoadingBar variant={"fullPage"} />
      ) : (
        <div className="w-full flex flex-col items-center justify-start gap-3 relative">
          <h1 className="text-4xl mt-2">{currentCultivationType.name}</h1>
          <div className="w-full p-2 flex flex-col items-center justify-start bg-background-950/50 h-[30rem] max-w-4xl">
            <VerticalScrollableDisplay
              header={"Assigned cultivations"}
              entries={currentCultivationType.cultivations}
              contentType={"cultivation"}
              className={""}
              detailsPageDisplay={true}
            />
          </div>
        </div>
      )}
    </PageWrapper>
  );
}

export default CultivationTypeDetails;
