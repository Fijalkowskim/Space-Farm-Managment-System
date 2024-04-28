import React, { useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import { useParams } from "react-router-dom";
import { useCultivation } from "../../hooks/cultivations/useCultivation";
import LoadingBar from "../../components/general/LoadingBar";
import CultivationDetailsHeader from "../../components/cultivations/CultivationDetailsHeader";
import VertivalScrollableDisplay from "../../components/verticalScrollableDisplay/VertivalScrollableDisplay";
import { useCultivationDetailsContext } from "../../context/cultivations/CultivationDetailsContext";
import CultivationDetailsModals from "../../components/cultivations/CultivationDetailsModals";
import { useLocation } from "react-router-dom";

function CultivationDetails() {
  const { id } = useParams();
  const { cultivation, isPending } = useCultivation(id);
  const { disableEditing } = useCultivationDetailsContext();
  const location = useLocation();

  useEffect(() => {
    disableEditing();
  }, [location]);
  return (
    <PageWrapper secured={true} className={"h-fit min-h-0"}>
      {cultivation === undefined && !isPending ? (
        <div className="-mt-20 h-screen flex items-center justify-center">
          <h1 className="text-xl text-center">
            There is no cultivation with given id.
          </h1>
        </div>
      ) : isPending ? (
        <LoadingBar variant={"fullPage"} />
      ) : (
        <div className="w-full flex flex-col items-center justify-start gap-3 relative">
          <CultivationDetailsModals cultivation={cultivation} />
          <CultivationDetailsHeader cultivation={cultivation} />
          <VertivalScrollableDisplay
            entries={cultivation.stages}
            header="Stages"
            contentType="stage"
            className="max-w-4xl items-start"
          />
          <VertivalScrollableDisplay
            entries={cultivation.harvests}
            header="Harvests"
            contentType="harvest"
            className="max-w-4xl items-start"
          />
          <VertivalScrollableDisplay
            entries={cultivation.stations}
            header="Stations"
            contentType="station"
            className="max-w-4xl items-start"
          />
          <VertivalScrollableDisplay
            entries={cultivation.responsibleWorkers}
            header="ResponsibleWorkers"
            contentType="worker"
            className="max-w-4xl items-start"
          />
        </div>
      )}
    </PageWrapper>
  );
}

export default CultivationDetails;
