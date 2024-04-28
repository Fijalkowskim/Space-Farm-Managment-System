import React from "react";
import { useCultivationDetailsContext } from "../../context/cultivations/CultivationDetailsContext";
import Modal from "../general/Modal";

function CultivationDetailsModals({ cultivation }) {
  const {
    editingStartDate,
    editingPlannedFinishDate,
    editingFinishDate,
    editingType,
    editingArea,
    editingComment,
    setEditingStartDate,
    setEditingPlannedFinishDate,
    setEditingFinishDate,
    setEditingType,
    setEditingArea,
    setEditingComment,
  } = useCultivationDetailsContext();
  return (
    <div className="fixed top-0 left-0 pointer-events-none">
      <Modal
        visible={editingStartDate}
        onClose={() => setEditingStartDate(false)}
      >
        <h2>Edit Start Date</h2>
      </Modal>

      <Modal
        visible={editingPlannedFinishDate}
        onClose={() => setEditingPlannedFinishDate(false)}
      >
        <h2>Edit Planned Finish Date</h2>
      </Modal>

      <Modal
        visible={editingFinishDate}
        onClose={() => setEditingFinishDate(false)}
      >
        <h2>Edit Finish Date</h2>
      </Modal>

      <Modal visible={editingType} onClose={() => setEditingType(false)}>
        <h2>Edit Type</h2>
      </Modal>

      <Modal visible={editingArea} onClose={() => setEditingArea(false)}>
        <h2>Edit Area</h2>
      </Modal>

      <Modal visible={editingComment} onClose={() => setEditingComment(false)}>
        <h2>Edit Comment</h2>
      </Modal>
    </div>
  );
}

export default CultivationDetailsModals;
