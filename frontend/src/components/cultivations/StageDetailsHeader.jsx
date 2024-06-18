import React from "react";
import { format } from "date-fns";
import DisplayCardAttribute from "../verticalScrollableDisplay/DisplayCardAttribute";
import { NavLink } from "react-router-dom";
import CustomButton from "../general/CustomButton";
import { useCultivationDetailsContext } from "../../context/cultivations/CultivationDetailsContext";
import { useDataCreationContext } from "../../context/general/DataCreationContext";
import { useCultivationContext } from "../../context/cultivations/CultivationContext";
import { useStageContext } from "../../context/StageContext";
import { useStageDetailsContext } from "../../context/StageDetailsContext";

function StageDetailsHeader({ stage, onUpdate, setChangingType }) {
  const { setEditedStage } = useStageDetailsContext();
  const { startCreatingObject } = useDataCreationContext();
  const { updateStage } = useStageContext();
  return (
    <div className="flex flex-col justify-center items-start w-full max-w-4xl bg-background-950/50 p-4 gap-2">
      <h1 className="text-3xl">Stage {stage.id}</h1>
      <div className="flex flex-row items-end justify-center gap-4">
        <DisplayCardAttribute
          label="type"
          value={stage.stageType.name}
          className={"text-xl"}
        />
      </div>
      <div className="w-full flex flex-row -mt-1 gap-4">
        <CustomButton
          variant="action"
          className={"text-sm w-32"}
          onClick={() => {
            setChangingType(true);
            startCreatingObject(
              stage,
              onUpdate,
              `/stage/${stage.id}`,
              "stage",
              undefined,
              false
            );
          }}
        >
          Change type
        </CustomButton>
      </div>
      <div className="w-full flex flex-row items-center justify-start flex-wrap mt-2">
        <div className="flex flex-row md:flex-nowrap flex-wrap items-center justify-start gap-6 w-full">
          <DisplayCardAttribute
            label="Start date"
            value={format(stage.startStageDate, "yyyy-MM-dd")}
          />
          <DisplayCardAttribute
            label="Finish date"
            value={
              stage.finishStageDate
                ? format(stage.finishStageDate, "yyyy-MM-dd")
                : "-"
            }
          />
          <DisplayCardAttribute
            label="Comment"
            value={!stage.comment || stage.comment === "" ? "-" : stage.comment}
          />
        </div>
        <CustomButton
          className={"text-sm"}
          onClick={() => {
            setEditedStage(stage);
          }}
        >
          Edit basic detials
        </CustomButton>
      </div>
    </div>
  );
}

export default StageDetailsHeader;
