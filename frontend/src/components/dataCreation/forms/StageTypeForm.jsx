import React from "react";
import DataCreationRegularInput from "../DataCreationRegularInput";

function StageTypeForm() {
  return (
    <>
      <DataCreationRegularInput
        property={"name"}
        label="name"
        type="text"
        required
      />
    </>
  );
}

export default StageTypeForm;
