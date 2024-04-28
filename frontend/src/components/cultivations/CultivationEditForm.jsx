import React, { useEffect, useState } from "react";
import CustomButton from "../general/CustomButton";
function CultivationEditForm({ editedCultivation, onSubmit }) {
  const [newCultivation, setNewCultivation] = useState();
  useEffect(() => {
    setNewCultivation(editedCultivation);
  }, [editedCultivation, setNewCultivation]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(editedCultivation);
      }}
      className="bg-background-800 p-4 flex flex-col items-center justify-center text-center gap-1"
    >
      <label className="text-xl capitalize">start date</label>
      <input
        required
        type={"date"}
        value={newCultivation?.startDate}
        className="bg-background-900 p-1"
        onChange={(e) =>
          setNewCultivation((prev) => ({
            ...prev,
            startDate: e.target.value,
          }))
        }
      />
      <CustomButton type="submit">Set</CustomButton>
    </form>
  );
}

export default CultivationEditForm;
