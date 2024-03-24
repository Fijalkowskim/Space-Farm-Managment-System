import React from "react";
import { cn } from "../helpers/helpers";

function PageWrapper({ children, className }) {
  return (
    <div
      className={cn(
        "min-h-screen flex items-start justify-center p-2 mt-16",
        className
      )}
    >
      {children}
    </div>
  );
}

export default PageWrapper;
