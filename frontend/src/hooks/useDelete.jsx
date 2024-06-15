import { useState, useEffect } from "react";
import { useStationContext } from "../context/StationContext";
import { usePopupContext } from "../context/general/PopupContext";
import { useGlobalReloadContext } from "../context/general/GlobalReloadContext";
export const useDelete = (contentType, id, setReload) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { logError } = usePopupContext();

  const { deleteStation } = useStationContext();
  const { setGlobalReload } = useGlobalReloadContext();
  var deleteMethod;
  switch (contentType) {
    case "station":
      deleteMethod = deleteStation;
      break;
  }
  const deleteItem = async () => {
    if (!deleteStation) return;
    setIsDeleting(true);
    try {
      const resp = await deleteMethod(id);
      setIsDeleting(false);
      setGlobalReload(true);
      return true;
    } catch (err) {
      logError(err);
    }
    setIsDeleting(false);
    return false;
  };

  return { isDeleting, deleteItem };
};
