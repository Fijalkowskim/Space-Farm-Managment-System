import React, { useEffect } from "react";
import VerticalScrollableDisplay from "../verticalScrollableDisplay/VerticalScrollableDisplay";
import { useObjectLoadingContext } from "../../context/general/ObjectLoadingContext";
import { ObjectsSelectionData } from "../../models/dataCreation/ObjectsSelectionData";

function DataCrationObjectInput({
  objectType,
  multiselect,
  header,
  contentType,
  propertyName,
}) {
  const { loadObjectsByType, data, isPending } = useObjectLoadingContext();
  useEffect(() => {
    loadObjectsByType(objectType);
  }, []);
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
