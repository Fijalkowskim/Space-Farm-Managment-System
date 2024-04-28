import React, { useState } from "react";
import CustomButton from "../general/CustomButton";
function CultivationEditForm({ editedCultivation }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        //onSubmit(newValue);
      }}
      className="bg-background-800 p-4 flex flex-col items-center justify-center text-center gap-1"
    >
      {/* <h1 className="text-xl">{header}</h1>
      <input
        required
        type={inputType}
        value={newValue}
        className="bg-background-900 p-1"
        onChange={(e) => setNewValue(e.target.value)}
      /> */}
      <CustomButton type="submit">Set</CustomButton>
    </form>
  );
}

export default CultivationEditForm;
