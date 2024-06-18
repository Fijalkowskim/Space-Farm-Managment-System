import React from "react";
import { cn } from "../../helpers/helpers";
function DisplayCardAttribute({ label, value, className, bool }) {
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
      <p>{bool ? (value === true ? "Yes" : "No") : value ?? "-"}</p>
    </div>
  );
}

export default DisplayCardAttribute;
