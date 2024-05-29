import React, { useEffect } from "react";
import { useDataCreationContext } from "../../context/general/DataCreationContext";
import { cn } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";

function DataCreationRegularInput({ property, label, ...props }) {
  const { getCurrentObjectProperty, setCurrentObjectProperty } =
    useDataCreationContext();

  return (
    <>
      <lablel htmlFor={property} className="capitalize text-text-50 -mb-2">
        {label === "" || label === undefined ? property : label}
      </lablel>
      <input
        id={property}
        className={cn(
          "p-1 bg-background-50 text-text-950 w-full max-w-sm text-center",
          props.className
        )}
        {...props}
        onChange={(e) => {
          setCurrentObjectProperty(property, e.target.value);
        }}
        value={getCurrentObjectProperty(property)}
      />
    </>
  );
}

export default DataCreationRegularInput;
