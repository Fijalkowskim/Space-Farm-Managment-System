import { ReactNode, createContext, useContext, useState } from "react";

const GlobalReloadContext = createContext();

export function useGlobalReloadContext() {
  return useContext(GlobalReloadContext);
}

export function GlobalReloadContextProvider({ children }) {
  const [globalReload, setGlobalReload] = useState(false);
  return (
    <GlobalReloadContext.Provider
      value={{
        globalReload,
        setGlobalReload,
      }}
    >
      {children}
    </GlobalReloadContext.Provider>
  );
}
