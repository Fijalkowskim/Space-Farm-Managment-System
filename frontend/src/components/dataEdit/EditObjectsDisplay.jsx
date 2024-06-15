import React, { useState } from "react";
import VerticalScrollableDisplay from "../verticalScrollableDisplay/VerticalScrollableDisplay";
import CustomButton from "../general/CustomButton";
import Modal from "../general/Modal";
import { useDataCreationContext } from "../../context/general/DataCreationContext";
import DataCrationObjectInput from "../dataCreation/DataCrationObjectInput";

function EditObjectsDisplay({
  entries,
  header,
  contentType,
  className,
  parentBody,
  parentType,
  onChoosingFinished,
  multiselect,
  propertyName,
  selectById = false,
  isPending,
}) {
  const [choosingObjects, setChoosingObjects] = useState(false);
  const {
    cancelCreatingObject,
    finishCreatingObject,
    startEditingObjectByType,
  } = useDataCreationContext();

  const onButtonClick = () => {
    startEditingObjectByType(parentBody, onChoosingFinished, parentType);
    setChoosingObjects(true);
  };
  const onModalClosed = () => {
    setChoosingObjects(false);
    cancelCreatingObject();
  };
  return (
    <div className="flex flex-col items-start justify-center w-full max-w-4xl bg-background-950/50 p-2">
      <VerticalScrollableDisplay
        entries={entries}
        header={header}
        contentType={contentType}
        className={className}
        detailsPageDisplay={true}
        isPending={isPending}
      />
      <CustomButton
        className={"ml-4 text-sm"}
        variant={"action"}
        onClick={onButtonClick}
      >
        Add existing
      </CustomButton>
      <Modal visible={choosingObjects} onClose={onModalClosed}>
        <div className="p-4 bg-background-900 flex flex-col items-center justify-center">
          <h1>Stations</h1>
          <DataCrationObjectInput
            multiselect={multiselect}
            header=""
            contentType={contentType}
            propertyName={propertyName ?? contentType}
            disableCreating={true}
            selectById={selectById}
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
    </div>
  );
}

export default EditObjectsDisplay;
