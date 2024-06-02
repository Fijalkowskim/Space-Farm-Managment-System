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
import { PlantCreateRequest } from "../../models/requestmodels/PlantCreateRequest";
import { usePlantContext } from "../dictionaries/PlantContext";
import { StageRequest } from "../../models/requestmodels/StageRequest";
import { useStageContext } from "../StageContext";
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
  const { addPlant } = usePlantContext();
  const { addStage } = useStageContext();

  // Method for starting new obejct creation process
  const startCreatingObject = (
    objectBody,
    createMethod,
    navigateAfterCreating,
    objectType,
    argumentsFromParent
  ) => {
    setObjectCreationQueue((prev) => {
      var newBody = objectBody;
      if (argumentsFromParent !== undefined && argumentsFromParent.length > 0) {
        argumentsFromParent.forEach((obj) => {
          newBody = setObjectProperty(newBody, obj.property, obj.value);
        });
      }
      return [
        new ObjectCreationData(
          newBody,
          createMethod,
          navigateAfterCreating,
          objectType
        ),
        ...prev,
      ];
    });

    navigate(`/create/${objectType.toLowerCase()}`);
  };
  // Simplified Method for starting new obejct creation process
  const startCreatingObjectByType = (dataType, argumentsFromParent) => {
    switch (dataType.toLowerCase()) {
      case "cultivation":
        startCreatingObject(
          new CultivationCreateRequest(),
          addCultivaiton,
          "/",
          "cultivation",
          argumentsFromParent
        );
        break;
      case "plant":
        startCreatingObject(
          new PlantCreateRequest(),
          addPlant,
          "/",
          "plant",
          argumentsFromParent
        );
        break;
      case "stage":
        startCreatingObject(
          new StageRequest(),
          addStage,
          `/cultivation/${
            getObjectProperty(argumentsFromParent, "cultivationId") ?? "-1"
          }`,
          "stage",
          argumentsFromParent
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
    if (await objectCreationData.createMethod(objectCreationData.object)) {
      addMessage(
        `${
          objectCreationData.objectType.charAt(0).toUpperCase() +
          objectCreationData.objectType.slice(1)
        } created successfully`,
        "info",
        -1
      );
      if (objectCreationQueue.length > 1) {
        navigate(`/create/${objectCreationQueue[1].objectType}`);
      } else if (objectCreationData.navigateAfterCreating !== undefined)
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
  //Method seting property in given object
  const setObjectProperty = (object, property, newValue) => {
    if (object === undefined || !object.hasOwnProperty(property)) return;

    return { ...object, [property]: newValue };
  };
  //Method getting property from given object
  const getObjectProperty = (object, property) => {
    if (object === undefined || !object.hasOwnProperty(property))
      return undefined;

    return object[property];
  };
  //Method seting property in currently created object
  const setCurrentObjectProperty = (property, newValue) => {
    if (
      objectCreationQueue.length <= 0 ||
      !objectCreationQueue[0].object.hasOwnProperty(property)
    )
      return;
    setObjectCreationQueue((prev) => {
      return prev.map((item, index) => {
        if (index === 0) {
          return { ...item, object: { ...item.object, [property]: newValue } };
        }
        return item;
      });
    });
  };
  //Method returning currently created object property
  const getCurrentObjectProperty = (property) => {
    return objectCreationQueue.length <= 0 ||
      !objectCreationQueue[0].object.hasOwnProperty(property)
      ? undefined
      : objectCreationQueue[0].object[property];
  };

  //Method seting property in currently created object
  const clearQueue = () => {
    setObjectCreationQueue([]);
  };
  const isCreatingObject = () => {
    return objectCreationQueue.length > 0;
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
        isCreatingObject,
      }}
    >
      {children}
    </DataCreationContext.Provider>
  );
}
