import React from "react";
import DataCreationRegularInput from "../DataCreationRegularInput";
import DataCrationObjectInput from "../DataCrationObjectInput";

function CultivationForm() {
  return (
    <>
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
      <DataCrationObjectInput
        multiselect={false}
        header={"Plant"}
        propertyName={"plant"}
        contentType={"plant"}
      />
      <DataCrationObjectInput
        multiselect={false}
        header={"Cultivation type"}
        propertyName={"type"}
        contentType={"cultivationType"}
      />
    </>
  );
}

export default CultivationForm;
