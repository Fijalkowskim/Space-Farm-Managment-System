import React, { useCallback, useEffect, useState } from "react";
import { useSettingsContext } from "../../context/general/SettingsContext";

function Modal({ children, onClose: onForcedClose, visible }) {
  const { setDisableScroll } = useSettingsContext();
  const closeModal = () => {
    onForcedClose();
    setDisableScroll(false);
  };

  useEffect(() => {
    setDisableScroll(visible);
  }, [visible]);

  return (
    <div
      className={`${
        visible ? "fixed" : "hidden"
      } w-screen h-screen top-0 left-0 z-10 flex items-center justify-center text-center pointer-events-auto`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (!visible) return;
          closeModal();
        }}
        className="absolute inset-0 bg-black/40 -z-10"
      ></div>
      {children}
    </div>
  );
}

export default Modal;
