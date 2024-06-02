import React from "react";
import { NavLink } from "react-router-dom";
import CustomButton from "../general/CustomButton";
import { useDataCreationContext } from "../../context/general/DataCreationContext";

function DataCreationButton({ dataType, argumentsFromParent }) {
  const { startCreatingObjectByType } = useDataCreationContext();
  return (
    <button className={"w-full"}>
      <CustomButton
        className={"w-full text-base"}
        onClick={() => startCreatingObjectByType(dataType, argumentsFromParent)}
      >
        Create new
      </CustomButton>
    </button>
  );
}

export default DataCreationButton;
