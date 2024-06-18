import React, { useEffect, useState } from "react";
import CustomButton from "../general/CustomButton";
import DataCrationObjectInput from "../dataCreation/DataCrationObjectInput";
function ReadingEditForm({ editedReading, onSubmit }) {
  const [newReading, setNewReading] = useState(editedReading);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  useEffect(() => {
    setNewReading({
      ...editedReading,
    });
  }, [editedReading, setNewReading]);
  if (!newReading) return;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(newReading);
      }}
      className="bg-background-800 p-4 flex flex-col items-center justify-center text-center gap-1 w-full max-w-md"
    >
      <h1 className="text-2xl mb-3">Edit Reading {editedReading?.id}</h1>
      <label className="capitalize -mb-1">Reading value</label>
      <input
        required
        type={"number"}
        min="0"
        value={newReading.value}
        className="bg-background-900 p-1 mb-1 w-full text-center"
        onChange={(e) =>
          setNewReading((prev) => ({
            ...prev,
            value: e.target.value,
          }))
        }
      />

      <CustomButton type="submit" className={"w-full mt-1"}>
        Set
      </CustomButton>
    </form>
  );
}

export default ReadingEditForm;
