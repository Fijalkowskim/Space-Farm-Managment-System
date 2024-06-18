import React from "react";
import { NavLink } from "react-router-dom";
import CustomButton from "../general/CustomButton";
import { useDataCreationContext } from "../../context/general/DataCreationContext";
import { useStationContext } from "../../context/StationContext";
import { useGlobalReloadContext } from "../../context/general/GlobalReloadContext";

function DataCreationButton({ dataType, argumentsFromParent }) {
  const { startCreatingObjectByType } = useDataCreationContext();
  const { addStation } = useStationContext();
  const { setGlobalReload } = useGlobalReloadContext();
  return (
    <button className={"w-full"}>
      <CustomButton
        className={"w-full text-base"}
        onClick={() => {
          if (dataType === "station") {
            addStation();
            setGlobalReload(true);
          } else startCreatingObjectByType(dataType, argumentsFromParent);
        }}
      >
        Create new
      </CustomButton>
    </button>
  );
}

export default DataCreationButton;
