import React from "react";
import { format } from "date-fns";
import DisplayCardAttribute from "../verticalScrollableDisplay/DisplayCardAttribute";
import { NavLink } from "react-router-dom";
import CustomButton from "../general/CustomButton";
import { useCultivationDetailsContext } from "../../context/cultivations/CultivationDetailsContext";

function CultivationDetailsHeader({ cultivation }) {
  const { setEditedCultivation } = useCultivationDetailsContext();
  return (
    <div className="flex flex-col justify-center items-start w-full max-w-4xl bg-background-950/50 p-4 gap-2">
      <h1 className="text-3xl">Cultivation {cultivation.id}</h1>
      <div className="flex flex-row items-end justify-center gap-4">
        <DisplayCardAttribute
          label="plant"
          value={cultivation.plant}
          className={"text-2xl"}
        />
      </div>
      {/* Plant */}
      <div className="w-full flex flex-row -mt-1 gap-4">
        <NavLink to="/">
          <CustomButton variant="action" className={"text-sm w-40"}>
            Go to plant page
          </CustomButton>
        </NavLink>
        <CustomButton variant="" className={"text-sm w-32"}>
          Change plant
        </CustomButton>
      </div>
      {/* Type */}
      <div className="flex flex-row items-end justify-center gap-4">
        <DisplayCardAttribute
          label="type"
          value={cultivation.type}
          className={"text-xl"}
        />
      </div>
      <div className="w-full flex flex-row -mt-1 gap-4">
        <NavLink to="/">
          <CustomButton variant="action" className={"text-sm w-40"}>
            Go to type page
          </CustomButton>
        </NavLink>
        <CustomButton variant="" className={"text-sm w-32"}>
          Change type
        </CustomButton>
      </div>
      <div className="w-full flex flex-row items-center justify-start flex-wrap mt-2">
        <div className="flex flex-row md:flex-nowrap flex-wrap items-center justify-start gap-6 w-full">
          <DisplayCardAttribute
            label="Start date"
            value={format(cultivation.startDate, "yyyy-MM-dd")}
          />
          <DisplayCardAttribute
            label="Planned finish date"
            value={format(cultivation.plannedFinishDate, "yyyy-MM-dd")}
          />
          <DisplayCardAttribute
            label="Real finish date"
            value={
              cultivation.realFinishDate
                ? format(cultivation.realFinishDate, "yyyy-MM-dd")
                : "-"
            }
          />
          <DisplayCardAttribute label="Area" value={`${cultivation.area} ha`} />
          <DisplayCardAttribute
            label="Comment"
            value={cultivation.comment ?? "-"}
          />
        </div>
        <CustomButton
          className={"text-sm"}
          onClick={() => {
            setEditedCultivation(cultivation);
          }}
        >
          Edit basic detials
        </CustomButton>
      </div>
    </div>
  );
}

export default CultivationDetailsHeader;
