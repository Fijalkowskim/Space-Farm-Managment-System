import React from "react";
import DataCreationRegularInput from "../DataCreationRegularInput";

function HarvestForm() {
  return (
    <>
      <DataCreationRegularInput
        property={"harvestDate"}
        label="Harvest Date"
        type="date"
        required
      />
      <DataCreationRegularInput
        property={"successfulHarvest"}
        label="Successful Harvest"
        type="checkbox"
      />
      <DataCreationRegularInput
        property={"comment"}
        label="Comment"
        type="text"
      />
    </>
  );
}

export default HarvestForm;
