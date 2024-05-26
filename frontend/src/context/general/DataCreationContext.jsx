import { ReactNode, createContext, useContext, useState } from "react";

const DataCreationContext = createContext();

export function useDataCreationContext() {
  return useContext(DataCreationContext);
}

export function DataCreationContextProvider({ children }) {
  const [createdObjects, setCreatedObjects] = useState([]);
  return (
    <DataCreationContext.Provider value={{}}>
      {children}
    </DataCreationContext.Provider>
  );
}
