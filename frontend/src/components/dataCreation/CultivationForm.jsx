import React from "react";
import DataCreationRegularInput from "./DataCreationRegularInput";
import DataCrationObjectInput from "./DataCrationObjectInput";

function CultivationForm() {
  return (
    <>
      <DataCrationObjectInput dataType="plant" />
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
