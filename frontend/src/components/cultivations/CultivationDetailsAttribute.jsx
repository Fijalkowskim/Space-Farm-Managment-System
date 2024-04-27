import React from "react";
import CultivationCardAttribute from "./CultivationCardAttribute";
import { cn } from "../../helpers/helpers";
import CustomButton from "../general/CustomButton";

function CultivationDetailsAttribute({
  label,
  value,
  className,
  buttonOnClick,
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-center gap-1",
        className
      )}
    >
      <CultivationCardAttribute
        label={label}
        value={value}
        className={"w-full"}
      />
      <CustomButton className={"text-sm"} onClick={buttonOnClick}>
        Set
      </CustomButton>
    </div>
  );
}

export default CultivationDetailsAttribute;
