import React from "react";
import { format } from "date-fns";
import DisplayCardAttribute from "../verticalScrollableDisplay/DisplayCardAttribute";
import { NavLink } from "react-router-dom";
import CustomButton from "../general/CustomButton";
import { useCultivationDetailsContext } from "../../context/cultivations/CultivationDetailsContext";
import { useDataCreationContext } from "../../context/general/DataCreationContext";
import { useCultivationContext } from "../../context/cultivations/CultivationContext";
import { useControlContext } from "../../context/ControlContext";
import { useControlDetailsContext } from "../../context/ControlDetailsContext";

function ControlDetailsHeader({ control, onUpdate, setChangingType }) {
  const { setEditedControl } = useControlDetailsContext();
  return (
    <div className="flex flex-col justify-center items-start w-full max-w-4xl bg-background-950/50 p-4 gap-2">
      <h1 className="text-3xl">Control {control.id}</h1>
      <div className="w-full flex flex-row items-center justify-start flex-wrap mt-2">
        <div className="flex flex-row md:flex-nowrap flex-wrap items-center justify-start gap-6 w-full">
          <DisplayCardAttribute
            label="Control date"
            value={format(control.controlDate, "yyyy-MM-dd")}
          />
          <DisplayCardAttribute
            label="Dead Seedlings"
            value={control.deadSeedlings}
          />
        </div>
        <CustomButton
          className={"text-sm"}
          onClick={() => {
            setEditedControl(control);
          }}
        >
          Edit basic detials
        </CustomButton>
      </div>
    </div>
  );
}

export default ControlDetailsHeader;
