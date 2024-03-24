import { ReactNode, createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export function useSettingsContext() {
  return useContext(SettingsContext);
}

export function SettingsContextProvider({ children }) {
  const [disableScroll, setDisableScroll] = useState(false);
  const [apiConnected] = useState(false);
  return (
    <SettingsContext.Provider
      value={{
        disableScroll,
        setDisableScroll,
        apiConnected,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
