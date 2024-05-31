import React, { useEffect } from "react";
import VerticalScrollableDisplay from "../verticalScrollableDisplay/VerticalScrollableDisplay";
import { useObjectLoadingContext } from "../../context/general/ObjectLoadingContext";

function DataCrationObjectInput({ objectType, multiselect }) {
  const { loadObjectsByType, data, isPending } = useObjectLoadingContext();
  useEffect(() => {
    loadObjectsByType(objectType);
  }, []);
  return (
    <div>
      <VerticalScrollableDisplay
        className={"h-80 max-w-[26rem] w-screen"}
        header={"Plants"}
        entries={data}
        contentType={"plant"}
        loading={isPending}
        returnSelectedElementMethod={() => {}}
      />
    </div>
  );
}

export default DataCrationObjectInput;
