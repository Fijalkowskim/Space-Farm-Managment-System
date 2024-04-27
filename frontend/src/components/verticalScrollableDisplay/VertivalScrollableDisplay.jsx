import React from "react";
import { cn } from "../../helpers/helpers";
import DisplayCard from "./DisplayCard";

function VertivalScrollableDisplay({
  header,
  entries,
  className,
  contentType,
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 justify-start items-center w-full flex-1 bg-background-950/50 p-4 h-full overflow-x-hidden overflow-y-scroll text-2xl shadow-md",
        className
      )}
    >
      <h1 className="">{header}</h1>
      {entries.map((entry) => (
        <DisplayCard key={entry.id} data={entry} contentType={contentType} />
      ))}
    </div>
  );
}

export default VertivalScrollableDisplay;
