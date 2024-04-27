import React from "react";
import { cn } from "../../helpers/helpers";
import CustomButton from "../general/CustomButton";
function DisplayCardAttribute({
  label,
  value,
  className,
  editable,
  onEditClick,
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-center truncate text-base",
        className
      )}
    >
      <h1 className="text-sm  font-light capitalize text-primary-500 opacity-70">
        {label}
      </h1>
      <p>{value}</p>
      {editable === true && (
        <CustomButton className={"text-sm"} onClick={onEditClick}>
          Set
        </CustomButton>
      )}
    </div>
  );
}

export default DisplayCardAttribute;
