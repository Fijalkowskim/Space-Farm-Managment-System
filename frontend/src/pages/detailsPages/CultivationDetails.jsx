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
import DataCrationObjectInput from "../../components/dataCreation/DataCrationObjectInput";
import { useDataCreationContext } from "../../context/general/DataCreationContext";
import CustomButton from "../../components/general/CustomButton";
import EditObjectsDisplay from "../../components/dataEdit/EditObjectsDisplay";
import { useStationContext } from "../../context/StationContext";
import { useFetchArrayData } from "../../hooks/useFetchArrayData";
import { usePersonContext } from "../../context/PersonContext";
function CultivationDetails() {
  const { id } = useParams();
  const {
    updateCultivation,
    getCultivation,
    updateCultivaitonStations,
    updateCultivaitonWorkers,
  } = useCultivationContext();
  const [dataUpdated, setDataUpdated] = useState(false);
  const { data, isPending } = useFetchData(
    getCultivation,
    id,
    dataUpdated,
    setDataUpdated
  );
  const { disableEditing, editedCultivation } = useCultivationDetailsContext();
  const location = useLocation();
  const { addMessage } = usePopupContext();
  const { cancelCreatingObject, finishCreatingObject } =
    useDataCreationContext();
  const [changingPlant, setChangingPlant] = useState(false);
  const [changingType, setChangingType] = useState(false);

  const { getStationsByCultivation } = useStationContext();
  const { getResponsibleWorkers } = usePersonContext();

  const { data: stations, isPending: stationsPending } = useFetchArrayData(
    getStationsByCultivation,
    id,
    dataUpdated,
    setDataUpdated
  );
  const { data: workers, isPending: workersPending } = useFetchArrayData(
    getResponsibleWorkers,
    id,
    dataUpdated,
    setDataUpdated
  );

  useEffect(() => {
    disableEditing();
  }, [location]);

  const cultivationBasicEditFormSubmit = async (newCultivation) => {
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
      setDataUpdated(true);
    }
  };
  const onWholeCultivationUpdate = async (newCultivation) => {
    const resp = await updateCultivation(data.id, newCultivation);
    if (resp === true) {
      addMessage("Cultivation updated successfully.");
      setDataUpdated(true);
    }
  };
  const onStationsChanged = async (newStationsReques) => {
    const resp = await updateCultivaitonStations(data.id, newStationsReques);
    if (resp === true) {
      addMessage("Stations updated successfully.");
      setDataUpdated(true);
    }
  };
  const onWorkersChanged = async (newWorkersReques) => {
    const resp = await updateCultivaitonWorkers(data.id, newWorkersReques);
    if (resp === true) {
      addMessage("Workers updated successfully.");
      setDataUpdated(true);
    }
  };

  const onObligatoryFieldUpdate = async (newBody) => {
    setChangingPlant(false);
    setChangingType(false);
    cultivationBasicEditFormSubmit(newBody);
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
              onSubmit={cultivationBasicEditFormSubmit}
            />
          </Modal>

          <Modal
            visible={changingPlant}
            onClose={() => {
              setChangingPlant(false);
              cancelCreatingObject();
            }}
          >
            <div className="p-4 bg-background-900 flex flex-col items-center justify-center">
              <h1>Select new plant</h1>
              <DataCrationObjectInput
                multiselect={false}
                header=""
                contentType={"plant"}
                propertyName={"plant"}
                disableCreating={true}
              />
              <CustomButton
                className={"mt-2"}
                onClick={(e) => {
                  e.preventDefault();
                  finishCreatingObject();
                }}
              >
                Select
              </CustomButton>
            </div>
          </Modal>

          <Modal
            visible={changingType}
            onClose={() => {
              setChangingType(false);
              cancelCreatingObject();
            }}
          >
            <div className="p-4 bg-background-900 flex flex-col items-center justify-center">
              <h1>Select new type</h1>
              <DataCrationObjectInput
                multiselect={false}
                header=""
                contentType={"cultivationType"}
                propertyName={"type"}
                disableCreating={true}
              />
              <CustomButton
                className={"mt-2"}
                onClick={(e) => {
                  e.preventDefault();
                  finishCreatingObject();
                }}
              >
                Select
              </CustomButton>
            </div>
          </Modal>
          <CultivationDetailsHeader
            cultivation={data}
            onUpdate={onObligatoryFieldUpdate}
            setChangingPlant={setChangingPlant}
            setChangingType={setChangingType}
          />
          <VerticalScrollableDisplay
            entries={data.stages}
            header="Stages"
            contentType="stage"
            className="max-w-4xl items-start"
            creationArgumentsFromParent={[
              { property: "cultivationId", value: data.id },
            ]}
          />
          <VerticalScrollableDisplay
            entries={data.harvests}
            header="Harvests"
            contentType="harvest"
            className="max-w-4xl items-start"
            creationArgumentsFromParent={[
              { property: "cultivationId", value: data.id },
            ]}
          />
          {data && (
            <>
              <EditObjectsDisplay
                entries={stations}
                header="Stations"
                contentType="station"
                className="max-w-4xl items-start"
                isPending={stationsPending}
                parentType={"cultivation"}
                parentBody={{ ids: stations?.map((s) => s.id) }}
                multiselect={true}
                propertyName={"ids"}
                selectById={true}
                onChoosingFinished={onStationsChanged}
              />
              <EditObjectsDisplay
                entries={workers}
                header="Responsible workers"
                contentType="worker"
                className="max-w-4xl items-start"
                isPending={workersPending}
                parentType={"cultivation"}
                parentBody={{ ids: workers?.map((s) => s.id) }}
                multiselect={true}
                propertyName={"ids"}
                selectById={true}
                onChoosingFinished={onWorkersChanged}
              />
            </>
          )}
        </div>
      )}
    </PageWrapper>
  );
}

export default CultivationDetails;
