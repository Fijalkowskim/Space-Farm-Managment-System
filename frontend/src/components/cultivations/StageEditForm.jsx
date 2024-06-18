import React, { useEffect, useState } from "react";
import CustomButton from "../general/CustomButton";
import DataCrationObjectInput from "../dataCreation/DataCrationObjectInput";
function StageEditForm({ editedStage, onSubmit }) {
  const [newStage, setNewStage] = useState(editedStage);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  useEffect(() => {
    setNewStage({
      ...editedStage,
      startStageDate: formatDate(editedStage.startStageDate),
      finishStageDate: formatDate(editedStage.finishStageDate),
    });
  }, [editedStage, setNewStage]);
  if (!newStage) return;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(newStage);
      }}
      className="bg-background-800 p-4 flex flex-col items-center justify-center text-center gap-1 w-full max-w-md"
    >
      <h1 className="text-2xl mb-3">Edit stage {editedStage?.id}</h1>
      <label className="capitalize -mb-1">start date</label>
      <input
        required
        type={"date"}
        value={newStage.startStageDate}
        className="bg-background-900 p-1 mb-1 w-full text-center"
        onChange={(e) =>
          setNewStage((prev) => ({
            ...prev,
            startStageDate: e.target.value,
          }))
        }
      />
      <label className="capitalize -mb-1">Finish date</label>
      <input
        type={"date"}
        value={newStage.finishStageDate}
        className="bg-background-900 p-1 mb-1 w-full text-center"
        onChange={(e) =>
          setNewStage((prev) => ({
            ...prev,
            finishStageDate: e.target.value,
          }))
        }
      />
      <CustomButton
        className={"text-xs"}
        type="button"
        onClick={() => {
          setNewStage((prev) => ({
            ...prev,
            finishStageDate: "",
          }));
        }}
      >
        Clear finish date
      </CustomButton>

      <label className="capitalize -mb-1">comment</label>
      <textarea
        value={newStage?.comment}
        className="bg-background-900 p-1 mb-1 resize-none w-full text-center"
        onChange={(e) =>
          setNewStage((prev) => ({
            ...prev,
            comment: e.target.value,
          }))
        }
      />

      <CustomButton type="submit" className={"w-full mt-1"}>
        Set
      </CustomButton>
    </form>
  );
}

export default StageEditForm;
