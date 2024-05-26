import React from "react";
import { NavLink } from "react-router-dom";
import CustomButton from "../general/CustomButton";
import { useDataCreationContext } from "../../context/general/DataCreationContext";

function DataCreationButton({ dataType }) {
  const { startCreatingObjectByType } = useDataCreationContext();
  return (
    <NavLink className={"w-full"} to={`create/${dataType}`}>
      <CustomButton
        className={"w-full text-base"}
        onClick={() => startCreatingObjectByType(dataType)}
      >
        Create new
      </CustomButton>
    </NavLink>
  );
}

export default DataCreationButton;
