import { ReactNode, createContext, useContext, useState } from "react";

const ControlDetailsContext = createContext();

export function useControlDetailsContext() {
  return useContext(ControlDetailsContext);
}

export function ControlDetailContextProvider({ children }) {
  const [editedControl, setEditedControl] = useState();
  const disableEditing = () => {
    setEditedControl(undefined);
  };
  return (
    <ControlDetailsContext.Provider
      value={{
        editedControl,
        setEditedControl,
        disableEditing,
      }}
    >
      {children}
    </ControlDetailsContext.Provider>
  );
}
