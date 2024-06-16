import React, { useEffect } from "react";
import VerticalScrollableDisplay from "../verticalScrollableDisplay/VerticalScrollableDisplay";
import { useLoadByType } from "../../hooks/useLoadByType";

function DataCrationObjectInput({
  multiselect,
  header,
  contentType,
  propertyName,
  disableCreating = false,
  selectById = false,
}) {
  const { data, isPending } = useLoadByType(contentType);
  return (
    <>
      <h1 className="mt-2 -mb-1">{header}</h1>
      <VerticalScrollableDisplay
        className={
          "h-80 max-w-[30rem] w-screen border-2 border-background-700 "
        }
        header={""}
        entries={data}
        contentType={contentType}
        loading={isPending}
        multiselect={multiselect}
        disableNavigation={true}
        disableDeleteButton={true}
        propertyName={propertyName}
        disableCreateButton={disableCreating}
        selectById={selectById}
      />
    </>
  );
}

export default DataCrationObjectInput;
