import { ReactNode, createContext, useContext, useState } from "react";

const CultivationDetailsContext = createContext();

export function useCultivationDetailsContext() {
  return useContext(CultivationDetailsContext);
}

export function CultivationDetailContextProvider({ children }) {
  const [editedCultivation, setEditedCultivation] = useState();
  const disableEditing = () => {
    setEditedCultivation(undefined);
  };
  return (
    <CultivationDetailsContext.Provider
      value={{
        editedCultivation,
        setEditedCultivation,
        disableEditing,
      }}
    >
      {children}
    </CultivationDetailsContext.Provider>
  );
}
