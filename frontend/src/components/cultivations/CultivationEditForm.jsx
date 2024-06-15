import React, { useEffect, useState } from "react";
import CustomButton from "../general/CustomButton";
import DataCrationObjectInput from "../dataCreation/DataCrationObjectInput";
function CultivationEditForm({ editedCultivation, onSubmit }) {
  const [newCultivation, setNewCultivation] = useState(editedCultivation);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  useEffect(() => {
    setNewCultivation({
      ...editedCultivation,
      startDate: formatDate(editedCultivation.startDate),
      plannedFinishDate: formatDate(editedCultivation.plannedFinishDate),
      realFinishDate: formatDate(editedCultivation.realFinishDate),
    });
  }, [editedCultivation, setNewCultivation]);
  if (!newCultivation) return;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(newCultivation);
      }}
      className="bg-background-800 p-4 flex flex-col items-center justify-center text-center gap-1 w-full max-w-md"
    >
      <h1 className="text-2xl mb-3">
        Edit cultivation {editedCultivation?.id}
      </h1>
      <label className="capitalize -mb-1">start date</label>
      <input
        required
        type={"date"}
        value={newCultivation.startDate}
        className="bg-background-900 p-1 mb-1 w-full text-center"
        onChange={(e) =>
          setNewCultivation((prev) => ({
            ...prev,
            startDate: e.target.value,
          }))
        }
      />
      <label className="capitalize -mb-1">planned finish date</label>
      <input
        required
        type={"date"}
        value={newCultivation.plannedFinishDate}
        className="bg-background-900 p-1 mb-1 w-full text-center"
        onChange={(e) =>
          setNewCultivation((prev) => ({
            ...prev,
            plannedFinishDate: e.target.value,
          }))
        }
      />
      <label className="capitalize -mb-1">real finish date</label>
      <input
        type={"date"}
        value={newCultivation.realFinishDate}
        className="bg-background-900 p-1 mb-1 w-full text-center"
        onChange={(e) =>
          setNewCultivation((prev) => ({
            ...prev,
            realFinishDate: e.target.value,
          }))
        }
      />
      <CustomButton
        className={"text-xs"}
        type="button"
        onClick={() => {
          setNewCultivation((prev) => ({
            ...prev,
            realFinishDate: "",
          }));
        }}
      >
        Clear real finish date
      </CustomButton>
      <label className="capitalize -mb-1">area</label>
      <input
        type={"number"}
        required
        value={newCultivation?.area}
        className="bg-background-900 p-1 mb-1 w-full text-center"
        onChange={(e) =>
          setNewCultivation((prev) => ({
            ...prev,
            area: e.target.value,
          }))
        }
      />

      <label className="capitalize -mb-1">comment</label>
      <textarea
        value={newCultivation?.comment}
        className="bg-background-900 p-1 mb-1 resize-none w-full text-center"
        onChange={(e) =>
          setNewCultivation((prev) => ({
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

export default CultivationEditForm;
