import React, { useEffect } from "react";
import VerticalScrollableDisplay from "../verticalScrollableDisplay/VerticalScrollableDisplay";
import { useLoadByType } from "../../hooks/useLoadByType";

function DataCrationObjectInput({
  multiselect,
  header,
  contentType,
  propertyName,
}) {
  const { data, isPending } = useLoadByType(contentType);
  return (
    <div>
      <VerticalScrollableDisplay
        className={"h-80 max-w-[26rem] w-screen"}
        header={header}
        entries={data}
        contentType={contentType}
        loading={isPending}
        multiselect={multiselect}
        disableNavigation={true}
        disableDeleteButton={true}
        propertyName={propertyName}
      />
    </div>
  );
}

export default DataCrationObjectInput;
