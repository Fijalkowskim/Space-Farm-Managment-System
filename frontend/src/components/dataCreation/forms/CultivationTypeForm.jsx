import React from "react";
import DataCreationRegularInput from "../DataCreationRegularInput";

function CultivationTypeForm() {
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

export default CultivationTypeForm;
