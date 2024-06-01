import React from "react";
import DataCreationRegularInput from "./DataCreationRegularInput";
import DataCrationObjectInput from "./DataCrationObjectInput";
import { ObjectsSelectionData } from "../../models/dataCreation/ObjectsSelectionData";

function CultivationForm() {
  return (
    <>
      <DataCrationObjectInput
        objectType="plant"
        multiselect={false}
        header={"Select plant"}
        propertyName={"plant"}
        contentType={"plant"}
      />
      <DataCreationRegularInput
        property={"startDate"}
        label="start date"
        type="date"
        required
      />
      <DataCreationRegularInput
        property={"plannedFinishDate"}
        label="planned Finish Date"
        type="date"
        required
      />
      <DataCreationRegularInput property={"area"} type="number" required />
      <DataCreationRegularInput property={"comment"} type="text" />
    </>
  );
}

export default CultivationForm;
