import React from "react";
import DisplayCardAttribute from "../DisplayCardAttribute";

function CultivationTypeCard({ data }) {
  return (
    <>
      <DisplayCardAttribute label="ID" value={data.id} />
      <DisplayCardAttribute
        label={`Name`}
        value={data.name}
        className={"ml-auto items-end"}
      />
    </>
  );
}

export default CultivationTypeCard;
