import React from "react";
import { cn } from "../../helpers/helpers";
import DisplayCard from "./DisplayCard";
import LoadingBar from "../general/LoadingBar";
import { usePersonContext } from "../../context/PersonContext";
import CustomButton from "../general/CustomButton";
import { NavLink } from "react-router-dom";
function VertivalScrollableDisplay({
  header,
  entries,
  className,
  contentType,
  loading,
  detailsPageDisplay,
  deleteButtonWorkerTypes,
  removeButtonWorkerTypes,
  disableCreateButton,
}) {
  const { userData } = usePersonContext();
  if (!userData) return;
  return (
    <div
      className={cn(
        "flex flex-col gap-4 justify-start items-center w-full flex-1 bg-background-950/50 p-4 h-full overflow-x-hidden overflow-y-scroll text-2xl shadow-md",
        className
      )}
    >
      <h1 className="">{header}</h1>
      <div className="w-full flex flex-row items-center justify-center gap-4 flex-shrink-0 -mt-2">
        {(disableCreateButton === undefined ||
          disableCreateButton === false) && (
          <NavLink className={"w-full"} to={`create/${contentType}`}>
            <CustomButton className={"w-full text-base"}>
              Create new
            </CustomButton>
          </NavLink>
        )}
        {detailsPageDisplay === true && (
          <CustomButton className={"w-full text-base"} variant={"action"}>
            Add existing
          </CustomButton>
        )}
      </div>
      {loading === true ? (
        <LoadingBar variant={"parent"} />
      ) : entries !== undefined &&
        entries.length !== undefined &&
        entries.length > 0 ? (
        entries.map((entry) => (
          <DisplayCard
            key={entry.id}
            data={entry}
            contentType={contentType}
            showDeleteButton={
              userData.role.toLowerCase() === "admin" ||
              userData.role.toLowerCase() === "manager"
            }
            showRemoveButton={
              detailsPageDisplay &&
              (userData.role.toLowerCase() === "admin" ||
                userData.role.toLowerCase() === "manager")
            }
          />
        ))
      ) : (
        <p className="text-base font-light -mt-3 opacity-70">No data yet</p>
      )}
    </div>
  );
}

export default VertivalScrollableDisplay;
