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
      className="bg-background-800 p-4 flex flex-col items-start justify-center text-center gap-1"
    >
      <h1 className="text-2xl mb-3">
        Edit cultivation {editedCultivation?.id}
      </h1>
      <label className="capitalize -mb-1">start date</label>
      <input
        required
        type={"date"}
        defaultValue={newCultivation?.startDate}
        value={newCultivation?.startDate}
        className="bg-background-900 p-1 mb-1"
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
        defaultValue={newCultivation?.plannedFinishDate}
        value={newCultivation?.plannedFinishDate}
        className="bg-background-900 p-1 mb-1"
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
        defaultValue={newCultivation?.realFinishDate}
        value={newCultivation?.realFinishDate}
        className="bg-background-900 p-1 mb-1"
        onChange={(e) =>
          setNewCultivation((prev) => ({
            ...prev,
            realFinishDate: e.target.value,
          }))
        }
      />
      <label className="capitalize -mb-1">area</label>
      <input
        type={"number"}
        required
        defaultValue={newCultivation?.area}
        value={newCultivation?.area}
        className="bg-background-900 p-1 mb-1"
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
        className="bg-background-900 p-1 mb-1 resize-none"
        onChange={(e) =>
          setNewCultivation((prev) => ({
            ...prev,
            area: e.target.value,
          }))
        }
      />

      <CustomButton type="submit">Set</CustomButton>
    </form>
  );
}

export default CultivationEditForm;
