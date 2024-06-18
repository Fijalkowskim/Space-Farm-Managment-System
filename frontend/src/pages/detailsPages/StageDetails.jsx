import React, { useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import { useParams } from "react-router-dom";
import LoadingBar from "../../components/general/LoadingBar";
import { useLocation } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { usePopupContext } from "../../context/general/PopupContext";
import { useDataCreationContext } from "../../context/general/DataCreationContext";
import { useStageContext } from "../../context/StageContext";
import { useStageDetailsContext } from "../../context/StageDetailsContext";
import { StageRequest } from "../../models/requestmodels/StageRequest";
import Modal from "../../components/general/Modal";
import StageEditForm from "../../components/cultivations/StageEditForm";
import DataCrationObjectInput from "../../components/dataCreation/DataCrationObjectInput";
import CustomButton from "../../components/general/CustomButton";
import StageDetailsHeader from "../../components/cultivations/StageDetailsHeader";
function StageDetails() {
  const [changingType, setChangingType] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);

  const { id } = useParams();
  const { updateStage, getStage } = useStageContext();
  const location = useLocation();
  const { addMessage } = usePopupContext();
  const { cancelCreatingObject, finishCreatingObject } =
    useDataCreationContext();
  const { disableEditing, editedCultivation, editedStage } =
    useStageDetailsContext();

  const { data, isPending } = useFetchData(
    getStage,
    id,
    dataUpdated,
    setDataUpdated
  );

  useEffect(() => {
    disableEditing();
  }, [location]);

  const stageBasicEditFormSubmit = async (newStage) => {
    const request = new StageRequest(
      newStage.stageType,
      newStage.startStageDate,
      newStage.finishStageDate,
      newStage.comment,
      newStage.controls,
      newStage.cultivationId
    );
    const resp = await updateStage(data.id, request);
    if (resp === true) {
      addMessage("Cultivation updated successfully.");
      setDataUpdated(true);
    }
  };
  const onObligatoryFieldUpdate = async (newBody) => {
    setChangingType(false);
    stageBasicEditFormSubmit(newBody);
  };
  return (
    <PageWrapper secured={true} className={"h-fit min-h-0"}>
      {data === undefined && !isPending ? (
        <div className="-mt-20 h-screen flex items-center justify-center">
          <h1 className="text-xl text-center">
            There is no stage with given id.
          </h1>
        </div>
      ) : isPending ? (
        <LoadingBar variant={"fullPage"} />
      ) : (
        <div className="w-full flex flex-col items-center justify-start gap-3 relative">
          <Modal visible={editedStage} onClose={disableEditing}>
            <StageEditForm
              editedStage={data}
              onSubmit={stageBasicEditFormSubmit}
            />
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
                contentType={"stageType"}
                propertyName={"stageType"}
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
          <StageDetailsHeader
            stage={data}
            onUpdate={onObligatoryFieldUpdate}
            setChangingType={setChangingType}
          />
        </div>
      )}
    </PageWrapper>
  );
}

export default StageDetails;
