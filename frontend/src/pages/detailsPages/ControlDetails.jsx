import React, { useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import { useParams } from "react-router-dom";
import LoadingBar from "../../components/general/LoadingBar";
import { useLocation } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { usePopupContext } from "../../context/general/PopupContext";
import { useDataCreationContext } from "../../context/general/DataCreationContext";
import { useControlDetailsContext } from "../../context/ControlDetailsContext.jsx";
import { ControlRequest } from "../../models/requestmodels/ControlRequest";
import Modal from "../../components/general/Modal";
import ControlEditForm from "../../components/cultivations/ControlEditForm";
import DataCrationObjectInput from "../../components/dataCreation/DataCrationObjectInput";
import CustomButton from "../../components/general/CustomButton";
import ControlDetailsHeader from "../../components/cultivations/ControlDetailsHeader";
import { useControlContext } from "../../context/ControlContext";
import { useFetchArrayData } from "../../hooks/useFetchArrayData";
import VerticalScrollableDisplay from "../../components/verticalScrollableDisplay/VerticalScrollableDisplay";
import { useReadingContext } from "../../context/ReadingContext";
function ControlDetails() {
  const [dataUpdated, setDataUpdated] = useState(false);

  const { id } = useParams();
  const { updateControl, getControl } = useControlContext();
  const location = useLocation();
  const { addMessage } = usePopupContext();
  const { cancelCreatingObject, finishCreatingObject } =
    useDataCreationContext();
  const { disableEditing, editedControl } = useControlDetailsContext();
  const { getReadingsByControl } = useReadingContext();

  const { data, isPending } = useFetchData(
    getControl,
    id,
    dataUpdated,
    setDataUpdated
  );
  const { data: readings, isPending: readingsPending } = useFetchArrayData(
    getReadingsByControl,
    id,
    dataUpdated,
    setDataUpdated
  );

  useEffect(() => {
    disableEditing();
  }, [location]);

  const controlBasicEditFormSubmit = async (newControl) => {
    const request = new ControlRequest(
      newControl.controlDate,
      newControl.deadSeedlings,
      newControl.readings,
      newControl.stageId
    );
    const resp = await updateControl(data.id, request);
    if (resp === true) {
      addMessage("Control updated successfully.");
      setDataUpdated(true);
      disableEditing();
    }
  };
  const onObligatoryFieldUpdate = async (newBody) => {
    controlBasicEditFormSubmit(newBody);
  };
  return (
    <PageWrapper secured={true} className={"h-fit min-h-0"}>
      {data === undefined && !isPending ? (
        <div className="-mt-20 h-screen flex items-center justify-center">
          <h1 className="text-xl text-center">
            There is no control with given id.
          </h1>
        </div>
      ) : isPending ? (
        <LoadingBar variant={"fullPage"} />
      ) : (
        <div className="w-full flex flex-col items-center justify-start gap-3 relative">
          <Modal visible={editedControl} onClose={disableEditing}>
            <ControlEditForm
              editedControl={data}
              onSubmit={controlBasicEditFormSubmit}
            />
          </Modal>
          <ControlDetailsHeader
            control={data}
            onUpdate={onObligatoryFieldUpdate}
          />
          <VerticalScrollableDisplay
            entries={readings}
            isPending={readingsPending}
            header="Readings"
            contentType="reading"
            className="max-w-4xl items-start"
            creationArgumentsFromParent={[
              { property: "controlId", value: data.id },
            ]}
            disableNavigation={true}
          />
        </div>
      )}
    </PageWrapper>
  );
}

export default ControlDetails;
