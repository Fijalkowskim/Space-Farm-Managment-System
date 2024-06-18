import { ReactNode, createContext, useContext, useState } from "react";

const ReadingDetailsContext = createContext();

export function useReadingDetailsContext() {
  return useContext(ReadingDetailsContext);
}

export function ReadingDetailContextProvider({ children }) {
  const [editedReading, setEditedReading] = useState();
  const disableEditing = () => {
    setEditedReading(undefined);
  };
  return (
    <ReadingDetailsContext.Provider
      value={{
        editedReading,
        setEditedReading,
        disableEditing,
      }}
    >
      {children}
    </ReadingDetailsContext.Provider>
  );
}
