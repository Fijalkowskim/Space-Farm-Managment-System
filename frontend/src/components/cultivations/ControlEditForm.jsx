import React, { useEffect, useState } from "react";
import CustomButton from "../general/CustomButton";
import DataCrationObjectInput from "../dataCreation/DataCrationObjectInput";
function ControlEditForm({ editedControl, onSubmit }) {
  const [newControl, setNewControl] = useState(editedControl);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  useEffect(() => {
    setNewControl({
      ...editedControl,
      controlDate: formatDate(editedControl.controlDate),
    });
  }, [editedControl, setNewControl]);
  if (!newControl) return;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(newControl);
      }}
      className="bg-background-800 p-4 flex flex-col items-center justify-center text-center gap-1 w-full max-w-md"
    >
      <h1 className="text-2xl mb-3">Edit control {editedControl?.id}</h1>
      <label className="capitalize -mb-1">Control date</label>
      <input
        required
        type={"date"}
        value={newControl.controlDate}
        className="bg-background-900 p-1 mb-1 w-full text-center"
        onChange={(e) =>
          setNewControl((prev) => ({
            ...prev,
            controlDate: e.target.value,
          }))
        }
      />

      <label className="capitalize -mb-1">Dead Seedlings</label>
      <input
        required
        type={"number"}
        min="0"
        value={newControl.deadSeedlings}
        className="bg-background-900 p-1 mb-1 w-full text-center"
        onChange={(e) =>
          setNewControl((prev) => ({
            ...prev,
            deadSeedlings: e.target.value,
          }))
        }
      />

      <CustomButton type="submit" className={"w-full mt-1"}>
        Set
      </CustomButton>
    </form>
  );
}

export default ControlEditForm;
