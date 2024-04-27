import React from "react";
import { cn } from "../../helpers/helpers";

function WorkerCardAttribute({ label, value, className }) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-center truncate",
        className
      )}
    >
      <h1 className="text-sm  font-light capitalize text-primary-500 opacity-70 truncate">
        {label}
      </h1>
      <p>{value}</p>
    </div>
  );
}

export default WorkerCardAttribute;