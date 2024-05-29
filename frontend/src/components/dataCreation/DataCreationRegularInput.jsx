import React from "react";
import { useDataCreationContext } from "../../context/general/DataCreationContext";
import { cn } from "../../helpers/helpers";

function DataCreationRegularInput({ property, ...props }) {
  const { getCurrentObjectProperty, setCurrentObjectProperty } =
    useDataCreationContext();
  return (
    <>
      <lablel htmlFor={property} className="capitalize text-text-50 -mb-2">
        {property}
      </lablel>
      <input
        id={property}
        className={cn("p-1 bg-background-50 text-text-950", props.className)}
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
