import React from "react";
import DataCreationRegularInput from "../DataCreationRegularInput";

function PlantForm() {
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

export default PlantForm;
