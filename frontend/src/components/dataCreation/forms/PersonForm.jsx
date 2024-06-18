import React from "react";
import DataCreationRegularInput from "../DataCreationRegularInput";
import DataCrationObjectInput from "../DataCrationObjectInput";
import DataCreationSelectInput from "../DataCreationSelectInput";

function PersonForm() {
  return (
    <>
      <DataCreationRegularInput property={"name"} type="text" required />
      <DataCreationRegularInput property={"surname"} type="text" required />
      <DataCreationRegularInput property={"login"} type="text" required />
      <DataCreationRegularInput property={"password"} type="text" required />
      <DataCreationSelectInput
        label={"Role"}
        property={"role"}
        contentType={"workerType"}
        values={["ADMIN", "MANAGER", "LABWORKER"]}
      />
    </>
  );
}

export default PersonForm;
