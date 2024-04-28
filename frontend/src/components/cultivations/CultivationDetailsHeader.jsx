import React from "react";
import { format } from "date-fns";
import DisplayCardAttribute from "../verticalScrollableDisplay/DisplayCardAttribute";
import { NavLink } from "react-router-dom";
import CustomButton from "../general/CustomButton";
import { useCultivationDetailsContext } from "../../context/cultivations/CultivationDetailsContext";

function CultivationDetailsHeader({ cultivation }) {
  const {
    setEditingStartDate,
    setEditingPlannedFinishDate,
    setEditingFinishDate,
    setEditingType,
    setEditingArea,
    setEditingComment,
  } = useCultivationDetailsContext();
  return (
    <div className="flex flex-col justify-center items-start w-full max-w-4xl bg-background-950/50 p-4 gap-2">
      <h1 className="text-3xl">Cultivation {cultivation.id}</h1>
      <div className="flex flex-row items-end justify-center gap-4">
        <DisplayCardAttribute
          label="plant"
          value={cultivation.plant}
          className={"text-2xl"}
        />
        <NavLink to="/">
          <CustomButton variant="action">Details</CustomButton>
        </NavLink>
      </div>
      <div className="w-full flex flex-row items-center justify-center flex-wrap">
        <div className="flex flex-row md:flex-nowrap flex-wrap items-center justify-start gap-6 w-full">
          <DisplayCardAttribute
            label="Start date"
            value={format(cultivation.startDate, "yyyy-MM-dd")}
            editable={true}
            onEditClick={() => {
              setEditingStartDate(true);
            }}
          />
          <DisplayCardAttribute
            label="Planned finish date"
            value={format(cultivation.plannedFinishDate, "yyyy-MM-dd")}
            editable={true}
            onEditClick={() => setEditingPlannedFinishDate(true)}
          />
          <DisplayCardAttribute
            label="Real finish date"
            value={
              cultivation.realFinishDate
                ? format(cultivation.realFinishDate, "yyyy-MM-dd")
                : "-"
            }
            editable={true}
            onEditClick={() => setEditingFinishDate(true)}
          />
          <DisplayCardAttribute
            label="Type"
            value={cultivation.type}
            editable={true}
            onEditClick={() => setEditingType(true)}
          />
          <DisplayCardAttribute
            label="Area"
            value={`${cultivation.area} ha`}
            editable={true}
            onEditClick={() => setEditingArea(true)}
          />
          <DisplayCardAttribute
            label="Comment"
            value={cultivation.comment ?? "-"}
            editable={true}
            onEditClick={() => setEditingComment(true)}
          />
        </div>
      </div>
    </div>
  );
}

export default CultivationDetailsHeader;
