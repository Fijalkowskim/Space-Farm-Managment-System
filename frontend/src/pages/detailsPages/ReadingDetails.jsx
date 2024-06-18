import React, { useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import { useParams } from "react-router-dom";
import LoadingBar from "../../components/general/LoadingBar";
import { useLocation } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { usePopupContext } from "../../context/general/PopupContext";
import { useDataCreationContext } from "../../context/general/DataCreationContext";
import { useReadingContext } from "../../context/ReadingContext";
import { useReadingDetailsContext } from "../../context/ReadingDetailsContext";
import { ReadingRequest } from "../../models/requestmodels/ReadingRequest";
import Modal from "../../components/general/Modal";
import ReadingEditForm from "../../components/cultivations/ReadingEditForm";
import DataCrationObjectInput from "../../components/dataCreation/DataCrationObjectInput";
import CustomButton from "../../components/general/CustomButton";
import ReadingDetailsHeader from "../../components/cultivations/ReadingDetailsHeader";
import { useControlContext } from "../../context/ControlContext";
import { useFetchArrayData } from "../../hooks/useFetchArrayData";
import VerticalScrollableDisplay from "../../components/verticalScrollableDisplay/VerticalScrollableDisplay";
function ReadingDetails() {
  const [changingUnit, setChangingUnit] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);

  const { id } = useParams();
  const { updateReading, getReading, updateReadingUnit } = useReadingContext();
  const location = useLocation();
  const { addMessage } = usePopupContext();
  const { cancelCreatingObject, finishCreatingObject } =
    useDataCreationContext();
  const { disableEditing, editedReading } = useReadingDetailsContext();
  const { data, isPending } = useFetchData(
    getReading,
    id,
    dataUpdated,
    setDataUpdated
  );

  useEffect(() => {
    disableEditing();
  }, [location]);

  const ReadingBasicEditFormSubmit = async (newReading) => {
    const request = new ReadingRequest(
      newReading.value,
      newReading.measuredValueId
    );
    const resp = await updateReading(data.id, request);
    if (resp === true) {
      addMessage("Reading updated successfully.");
      setDataUpdated(true);
      disableEditing();
    }
  };
  const onObligatoryFieldUpdate = async (newBody) => {
    setChangingUnit(false);
    const resp = await updateReadingUnit(data.id, newBody.measuredValueId);
    if (resp === true) {
      addMessage("Reading updated successfully.");
      setDataUpdated(true);
      disableEditing();
    }
  };
  return (
    <PageWrapper secured={true} className={"h-fit min-h-0"}>
      {data === undefined && !isPending ? (
        <div className="-mt-20 h-screen flex items-center justify-center">
          <h1 className="text-xl text-center">
            There is no Reading with given id.
          </h1>
        </div>
      ) : isPending ? (
        <LoadingBar variant={"fullPage"} />
      ) : (
        <div className="w-full flex flex-col items-center justify-start gap-3 relative">
          <Modal visible={editedReading} onClose={disableEditing}>
            <ReadingEditForm
              editedReading={data}
              onSubmit={ReadingBasicEditFormSubmit}
            />
          </Modal>
          <Modal
            visible={changingUnit}
            onClose={() => {
              setChangingUnit(false);
              cancelCreatingObject();
            }}
          >
            <div className="p-4 bg-background-900 flex flex-col items-center justify-center">
              <h1>Select new unit</h1>
              <DataCrationObjectInput
                multiselect={false}
                header=""
                contentType={"measureUnit"}
                propertyName={"measureUnitId"}
                disableCreating={true}
                selectById={true}
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
          <ReadingDetailsHeader
            reading={data}
            onUpdate={onObligatoryFieldUpdate}
            setChangingType={setChangingUnit}
          />
        </div>
      )}
    </PageWrapper>
  );
}

export default ReadingDetails;
