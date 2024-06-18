import React from "react";
import DataCreationRegularInput from "../DataCreationRegularInput";

function MeasureUnitForm() {
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

export default MeasureUnitForm;
