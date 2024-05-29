import React from "react";
import DataCreationRegularInput from "./DataCreationRegularInput";

function CultivationForm() {
  return (
    <>
      <DataCreationRegularInput property={"comment"} type="text" required />
    </>
  );
}

export default CultivationForm;
