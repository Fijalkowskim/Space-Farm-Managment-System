import React from "react";
import DataCreationRegularInput from "../DataCreationRegularInput";
import DataCrationObjectInput from "../DataCrationObjectInput";

function ControlForm() {
  return (
    <>
      <DataCreationRegularInput
        property={"controlDate"}
        label="Control date"
        type="date"
        required
      />
      <DataCreationRegularInput
        property={"deadSeedlings"}
        label="Dead Seedlings"
        type="number"
        min="0"
      />
    </>
  );
}

export default ControlForm;
