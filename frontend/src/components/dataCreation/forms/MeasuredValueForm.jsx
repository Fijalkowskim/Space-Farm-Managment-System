import React from "react";
import DataCreationRegularInput from "../DataCreationRegularInput";
import DataCrationObjectInput from "../DataCrationObjectInput";

function MeasuredValueForm() {
  return (
    <>
      <DataCreationRegularInput
        property={"name"}
        label="Name"
        type="text"
        required
      />
      <DataCrationObjectInput
        multiselect={false}
        header={"Measure unit"}
        propertyName={"measureUnitId"}
        contentType={"measureUnit"}
        selectById={true}
      />
    </>
  );
}

export default MeasuredValueForm;
