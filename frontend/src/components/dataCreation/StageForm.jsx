import React from "react";
import DataCreationRegularInput from "./DataCreationRegularInput";

function StageForm() {
  return (
    <>
      <DataCreationRegularInput
        property={"cultivationId"}
        label="cultivationId"
        type="number"
        required
      />
    </>
  );
}

export default StageForm;
