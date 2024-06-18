import React from "react";
import { format } from "date-fns";
import DisplayCardAttribute from "../verticalScrollableDisplay/DisplayCardAttribute";
import { NavLink } from "react-router-dom";
import CustomButton from "../general/CustomButton";
import { useCultivationDetailsContext } from "../../context/cultivations/CultivationDetailsContext";
import { useDataCreationContext } from "../../context/general/DataCreationContext";
import { useCultivationContext } from "../../context/cultivations/CultivationContext";
import { useReadingContext } from "../../context/ReadingContext";
import { useReadingDetailsContext } from "../../context/ReadingDetailsContext";

function ReadingDetailsHeader({
  reading,
  onUpdate,
  setChangingType: setChangingUnit,
}) {
  const { setEditedReading } = useReadingDetailsContext();
  const { startCreatingObject } = useDataCreationContext();
  return (
    <div className="flex flex-col justify-center items-start w-full max-w-4xl bg-background-950/50 p-4 gap-2">
      <h1 className="text-3xl">Reading {reading?.id}</h1>
      {/* Type */}
      <div className="flex flex-row items-end justify-center gap-4">
        <DisplayCardAttribute
          label="Measured value"
          value={`${reading.measuredValue?.name} - (${reading.measuredValue?.measureUnit?.name})`}
          className={"text-xl"}
        />
      </div>
      <div className="w-full flex flex-row -mt-1 gap-4">
        <CustomButton
          variant="action"
          className={"text-sm w-32"}
          onClick={() => {
            setChangingUnit(true);
            startCreatingObject(
              { measuredValueId: reading.measuredValue.id },
              onUpdate,
              `/reading/${reading.id}`,
              "reading",
              undefined,
              false
            );
          }}
        >
          Change measured value
        </CustomButton>
      </div>
      <div className="w-full flex flex-row items-center justify-start flex-wrap mt-2">
        <div className="flex flex-row md:flex-nowrap flex-wrap items-center justify-start gap-6 w-full">
          <DisplayCardAttribute label="Value" value={reading?.value} />
        </div>
        <CustomButton
          className={"text-sm"}
          onClick={() => {
            setEditedReading(reading);
          }}
        >
          Edit basic detials
        </CustomButton>
      </div>
    </div>
  );
}

export default ReadingDetailsHeader;
