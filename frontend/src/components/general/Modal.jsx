import React, { useCallback, useEffect, useState } from "react";
import { useSettingsContext } from "../../context/SettingsContext";

function Modal({ children, onClose, onValueSet, visible }) {
  const { setDisableScroll } = useSettingsContext();
  const closeModal = () => {
    onClose();
    setDisableScroll(false);
  };

  useEffect(() => {
    setDisableScroll(visible);
  }, [visible]);

  return (
    <div
      className={`${
        visible ? "absolute" : "hidden"
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
