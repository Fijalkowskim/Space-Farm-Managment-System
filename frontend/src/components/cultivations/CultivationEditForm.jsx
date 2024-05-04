import React, { useEffect, useState } from "react";
import CustomButton from "../general/CustomButton";

function CultivationEditForm({ editedCultivation, onSubmit, visible }) {
  const [newCultivation, setNewCultivation] = useState();
  useEffect(() => {
    setNewCultivation(editedCultivation);
  }, [editedCultivation, setNewCultivation, visible]);
  if (!newCultivation) return;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(editedCultivation);
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
        value={
          newCultivation.startDate
            ? newCultivation.startDate.toISOString().split("T")[0]
            : newCultivation.startDate
        }
        className="bg-background-900 p-1 mb-1 w-full text-center"
        onChange={(e) =>
          setNewCultivation((prev) => ({
            ...prev,
            startDate: new Date(e.target.value),
          }))
        }
      />
      <label className="capitalize -mb-1">planned finish date</label>
      <input
        required
        type={"date"}
        value={
          newCultivation.plannedFinishDate
            ? newCultivation.plannedFinishDate.toISOString().split("T")[0]
            : newCultivation.plannedFinishDate
        }
        className="bg-background-900 p-1 mb-1 w-full text-center"
        onChange={(e) =>
          setNewCultivation((prev) => ({
            ...prev,
            plannedFinishDate: new Date(e.target.value),
          }))
        }
      />
      <label className="capitalize -mb-1">real finish date</label>
      <input
        type={"date"}
        value={
          newCultivation.realFinishDate
            ? newCultivation.realFinishDate.toISOString().split("T")[0]
            : newCultivation.realFinishDate
        }
        className="bg-background-900 p-1 mb-1 w-full text-center"
        onChange={(e) =>
          setNewCultivation((prev) => ({
            ...prev,
            realFinishDate: new Date(e.target.value),
          }))
        }
      />
      <label className="capitalize -mb-1">area</label>
      <input
        type={"number"}
        required
        defaultValue={newCultivation?.area}
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
