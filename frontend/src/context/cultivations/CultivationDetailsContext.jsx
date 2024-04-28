import { ReactNode, createContext, useContext, useState } from "react";

const CultivationDetailsContext = createContext();

export function useCultivationDetailsContext() {
  return useContext(CultivationDetailsContext);
}

export function CultivationDetailContextProvider({ children }) {
  const [editingStartDate, setEditingStartDate] = useState(false);
  const [editingPlannedFinishDate, setEditingPlannedFinishDate] =
    useState(false);
  const [editingFinishDate, setEditingFinishDate] = useState(false);
  const [editingType, setEditingType] = useState(false);
  const [editingArea, setEditingArea] = useState(false);
  const [editingComment, setEditingComment] = useState(false);

  const disableEditing = () => {
    setEditingStartDate(false);
    setEditingPlannedFinishDate(false);
    setEditingFinishDate(false);
    setEditingType(false);
    setEditingArea(false);
    setEditingComment(false);
  };

  return (
    <CultivationDetailsContext.Provider
      value={{
        editingStartDate,
        setEditingStartDate,
        editingPlannedFinishDate,
        setEditingPlannedFinishDate,
        editingFinishDate,
        setEditingFinishDate,
        editingType,
        setEditingType,
        editingArea,
        setEditingArea,
        editingComment,
        setEditingComment,

        disableEditing,
      }}
    >
      {children}
    </CultivationDetailsContext.Provider>
  );
}
