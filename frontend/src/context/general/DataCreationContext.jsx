import { ReactNode, createContext, useContext, useState } from "react";
import { api } from "../../api/api";
import { usePopupContext } from "./PopupContext";
import { useNavigate } from "react-router-dom";
import { ObjectCreationData } from "../../models/dataCreation/ObjectCreationData";
const DataCreationContext = createContext();

export function useDataCreationContext() {
  return useContext(DataCreationContext);
}

export function DataCreationContextProvider({ children }) {
  const { addMessage } = usePopupContext();
  const [objectCreationQueue, setObjectCreationQueue] = useState([]);
  const { navigate } = useNavigate();
  // Method for starting new obejct creation process
  const startCreatingObject = (
    objectBody,
    createMethod,
    navigateAfterCreating,
    objectType
  ) => {
    setObjectCreationQueue((prev) => [
      new ObjectCreationData(
        objectBody,
        createMethod,
        navigateAfterCreating,
        objectType
      ),
      ...prev,
    ]);
  };
  // Method for finishing obejct creation process
  const finishCreatingObject = async () => {
    if (objectCreationQueue.length <= 0) {
      addMessage("There is no object to create", "error", -1);
      return false;
    }

    const objectCreationData = objectCreationQueue[0];

    if (await objectCreationData.createMethod()) {
      addMessage(
        `${
          objectCreationData.objectType.charAt(0).toUpperCase() +
          objectCreationData.objectType.slice(1)
        } created successfully`,
        "info",
        -1
      );

      if (objectCreationData.navigateAfterCreating !== undefined)
        navigate(objectCreationData.navigateAfterCreating);

      setObjectCreationQueue((prev) => (prev.length <= 1 ? [] : prev.slice(1)));
    } else {
      // If couldn't create object
      addMessage(
        `There was an error while creating ${objectCreationData.objectType.toLowerCase()}`,
        "error",
        -1
      );
    }
  };
  return (
    <DataCreationContext.Provider value={{}}>
      {children}
    </DataCreationContext.Provider>
  );
}
