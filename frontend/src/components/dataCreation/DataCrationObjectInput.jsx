import React, { useEffect } from "react";
import VerticalScrollableDisplay from "../verticalScrollableDisplay/VerticalScrollableDisplay";
import { useObjectLoadingContext } from "../../context/general/ObjectLoadingContext";
import { ObjectsSelectionData } from "../../models/dataCreation/ObjectsSelectionData";

function DataCrationObjectInput({ objectType, multiselect }) {
  const { loadObjectsByType, data, isPending } = useObjectLoadingContext();
  useEffect(() => {
    loadObjectsByType(objectType);
  }, []);
  const onSelect = () => {};
  return (
    <div>
      <VerticalScrollableDisplay
        className={"h-80 max-w-[26rem] w-screen"}
        header={"Plant"}
        entries={data}
        contentType={"plant"}
        loading={isPending}
        objectSelectionData={new ObjectsSelectionData(onSelect, false)}
        disableNavigation={true}
        disableDeleteButton={true}
        propertyName={"plant"}
      />
    </div>
  );
}

export default DataCrationObjectInput;
