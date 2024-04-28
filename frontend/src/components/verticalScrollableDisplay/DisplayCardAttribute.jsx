import React from "react";
import { cn } from "../../helpers/helpers";
import CustomButton from "../general/CustomButton";
function DisplayCardAttribute({ label, value, className }) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-center truncate text-base pointer-events-auto",
        className
      )}
    >
      <h1 className="text-sm  font-light capitalize text-primary-500 opacity-70">
        {label}
      </h1>
      <p>{value}</p>
    </div>
  );
}

export default DisplayCardAttribute;
