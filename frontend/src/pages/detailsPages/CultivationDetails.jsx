import React, { useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import { useNavigate, useParams } from "react-router-dom";
import { useCultivation } from "../../hooks/cultivations/useCultivation";
import LoadingBar from "../../components/general/LoadingBar";
import CultivationDetailsHeader from "../../components/cultivations/CultivationDetailsHeader";
import VerticalScrollableDisplay from "../../components/verticalScrollableDisplay/VerticalScrollableDisplay";
import { useCultivationDetailsContext } from "../../context/cultivations/CultivationDetailsContext";
import { useLocation } from "react-router-dom";
import CultivationEditForm from "../../components/cultivations/CultivationEditForm";
import { useCultivationContext } from "../../context/cultivations/CultivationContext";
import Modal from "../../components/general/Modal";
import { useFetchData } from "../../hooks/useFetchData";
import { CultivationRequest } from "../../models/requestmodels/CultivationRequest";
import { usePopupContext } from "../../context/general/PopupContext";

function CultivationDetails() {
  const { id } = useParams();
  const { updateCultivation, getCultivation } = useCultivationContext();
  const { data, isPending } = useFetchData(getCultivation, id);
  const { disableEditing, editedCultivation } = useCultivationDetailsContext();
  const location = useLocation();
  const { addMessage } = usePopupContext();
  useEffect(() => {
    disableEditing();
  }, [location]);

  const cultivationEditFormSubmit = async (newCultivation) => {
    const request = new CultivationRequest(
      newCultivation.startDate,
      newCultivation.plannedFinishDate,
      newCultivation.realFinishDate,
      newCultivation.plant,
      newCultivation.comment,
      newCultivation.area,
      newCultivation.type
    );
    const resp = await updateCultivation(data.id, request);
    if (resp === true) {
      addMessage("Cultivation updated successfully.");
    }
  };
  return (
    <PageWrapper secured={true} className={"h-fit min-h-0"}>
      {data === undefined && !isPending ? (
        <div className="-mt-20 h-screen flex items-center justify-center">
          <h1 className="text-xl text-center">
            There is no cultivation with given id.
          </h1>
        </div>
      ) : isPending ? (
        <LoadingBar variant={"fullPage"} />
      ) : (
        <div className="w-full flex flex-col items-center justify-start gap-3 relative">
          <Modal visible={editedCultivation} onClose={disableEditing}>
            <CultivationEditForm
              editedCultivation={data}
              onSubmit={cultivationEditFormSubmit}
            />
          </Modal>

          <CultivationDetailsHeader cultivation={data} />
          <VerticalScrollableDisplay
            entries={data.stages}
            header="Stages"
            contentType="stage"
            className="max-w-4xl items-start"
            detailsPageDisplay={true}
            creationArgumentsFromParent={[
              { property: "cultivationId", value: data.id },
            ]}
          />
          <VerticalScrollableDisplay
            entries={data.harvests}
            header="Harvests"
            contentType="harvest"
            className="max-w-4xl items-start"
            detailsPageDisplay={true}
          />
          <VerticalScrollableDisplay
            entries={data.stations}
            header="Stations"
            contentType="station"
            className="max-w-4xl items-start"
            detailsPageDisplay={true}
          />
          <VerticalScrollableDisplay
            entries={data.responsibleWorkers}
            header="ResponsibleWorkers"
            contentType="worker"
            className="max-w-4xl items-start"
            detailsPageDisplay={true}
          />
        </div>
      )}
    </PageWrapper>
  );
}

export default CultivationDetails;
