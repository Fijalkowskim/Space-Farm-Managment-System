import React from "react";

function CultivationCardAttribute({ label, value }) {
  return (
    <div className="flex flex-col items-start justify-center truncate">
      <h1 className="text-sm  font-light capitalize text-primary-500">
        {label}
      </h1>
      <p>{value}</p>
    </div>
  );
}

export default CultivationCardAttribute;
