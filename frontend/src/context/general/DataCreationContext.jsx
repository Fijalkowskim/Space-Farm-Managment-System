import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../../api/api";
import { usePopupContext } from "./PopupContext";
import { useLocation, useNavigate } from "react-router-dom";
import { ObjectCreationData } from "../../models/dataCreation/ObjectCreationData";
import { CultivationCreateRequest } from "../../models/requestmodels/CultivationCreateRequest";
import { useCultivationContext } from "../cultivations/CultivationContext";
const DataCreationContext = createContext();

export function useDataCreationContext() {
  return useContext(DataCreationContext);
}

export function DataCreationContextProvider({ children }) {
  const { addMessage } = usePopupContext();
  const [objectCreationQueue, setObjectCreationQueue] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const { addCultivaiton } = useCultivationContext();

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
    console.log(
      new ObjectCreationData(
        objectBody,
        createMethod,
        navigateAfterCreating,
        objectType
      )
    );
  };
  // Simplified Method for starting new obejct creation process
  const startCreatingObjectByType = (dataType) => {
    switch (dataType.toLowerCase()) {
      case "cultivation":
        startCreatingObject(
          new CultivationCreateRequest(),
          addCultivaiton,
          "/",
          "cultivation"
        );
        break;
    }
  };
  // Method for finishing obejct creation process
  const finishCreatingObject = async () => {
    if (objectCreationQueue.length <= 0) {
      addMessage("There is no object to create.", "error", -1);
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

      return true;
    } else {
      // If couldn't create object
      addMessage(
        `There was an error while creating ${objectCreationData.objectType.toLowerCase()}. Check all fields.`,
        "error",
        -1
      );
    }
  };
  //Method returning currently created object
  const getCurrentObject = () => {
    return objectCreationQueue.length <= 0 ? undefined : objectCreationQueue[0];
  };
  //Method seting currently created object
  const setCurrentObject = (newObject) => {
    if (objectCreationQueue.length <= 0) return;
    setObjectCreationQueue((prev) =>
      prev.map((objectCreationData, i) => {
        return i === 0
          ? { ...objectCreationData, object: newObject }
          : objectCreationData;
      })
    );
  };
  //Method seting property in currently created object
  const setCurrentObjectProperty = (property, newValue) => {
    if (
      objectCreationQueue.length <= 0 ||
      !objectCreationQueue[0].object.hasOwnProperty(property)
    )
      return;
    setObjectCreationQueue((prev) => {
      prev[0].object[property] = newValue;
      return prev;
    });
  };
  //Method returning currently created object property
  const getCurrentObjectProperty = (property) => {
    return objectCreationQueue.length <= 0 ||
      !objectCreationQueue[0].object.hasOwnProperty(property)
      ? undefined
      : objectCreationQueue[0][property];
  };
  //Method seting property in currently created object
  const clearQueue = () => {
    setObjectCreationQueue([]);
  };
  useEffect(() => {
    if (!location.pathname.includes("/create/")) clearQueue();
  }, [location]);
  return (
    <DataCreationContext.Provider
      value={{
        startCreatingObjectByType,
        finishCreatingObject,
        getCurrentObject,
        setCurrentObject,
        setCurrentObjectProperty,
        getCurrentObjectProperty,
      }}
    >
      {children}
    </DataCreationContext.Provider>
  );
}
