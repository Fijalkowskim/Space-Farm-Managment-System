import React, { useEffect } from "react";
import { useDataCreationContext } from "../../context/general/DataCreationContext";
import { cn } from "../../helpers/helpers";
import { formatDate } from "../../helpers/helpers";
function DataCreationSelectInput({ property, label, values, ...props }) {
  const { getCurrentObjectProperty, setCurrentObjectProperty } =
    useDataCreationContext();
  useEffect(() => {
    setCurrentObjectProperty(property, values[0]);
  }, [values, property]);

  if (!values || values?.length <= 0) return;
  return (
    <>
      <lablel htmlFor={property} className="capitalize text-text-50 -mb-2">
        {label === "" || label === undefined ? property : label}
      </lablel>
      <select
        id={property}
        className={cn(
          "p-1 bg-background-50 text-text-950 w-full max-w-sm text-center",
          props.className
        )}
        {...props}
        onChange={(e) => {
          setCurrentObjectProperty(property, e.target.value);
        }}
      >
        {values.map((v) => (
          <option value={v}>{v}</option>
        ))}
      </select>
    </>
  );
}

export default DataCreationSelectInput;
