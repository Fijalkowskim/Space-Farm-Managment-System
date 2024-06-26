import React from "react";
import DataCreationRegularInput from "../DataCreationRegularInput";
import DataCrationObjectInput from "../DataCrationObjectInput";

function ReadingForm() {
  return (
    <>
      <DataCreationRegularInput
        property={"value"}
        label="Value"
        type="number"
        min="0"
        required
      />
      <DataCrationObjectInput
        multiselect={false}
        header={"Measured value"}
        propertyName={"measuredValueId"}
        contentType={"measuredValue"}
        selectById={true}
      />
    </>
  );
}

export default ReadingForm;
