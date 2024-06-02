import React from "react";
import DataCreationRegularInput from "../DataCreationRegularInput";
import DataCrationObjectInput from "../DataCrationObjectInput";

function StageForm() {
  return (
    <>
      <DataCreationRegularInput
        property={"startStageDate"}
        label="Start date"
        type="date"
        required
      />
      <DataCreationRegularInput
        property={"comment"}
        label="Comment"
        type="text"
      />
      <DataCrationObjectInput
        multiselect={false}
        header={"Stage type"}
        propertyName={"stageType"}
        contentType={"stageType"}
      />
    </>
  );
}

export default StageForm;
