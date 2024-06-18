import { ReactNode, createContext, useContext, useState } from "react";

const StageDetailsContext = createContext();

export function useStageDetailsContext() {
  return useContext(StageDetailsContext);
}

export function StageDetailContextProvider({ children }) {
  const [editedStage, setEditedStage] = useState();
  const disableEditing = () => {
    setEditedStage(undefined);
  };
  return (
    <StageDetailsContext.Provider
      value={{
        editedStage,
        setEditedStage,
        disableEditing,
      }}
    >
      {children}
    </StageDetailsContext.Provider>
  );
}
