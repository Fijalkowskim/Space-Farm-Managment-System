import React, { useEffect } from "react";
import { usePopupContext } from "../../context/PopupContext";
import PopupCard from "./PopupCard";

function PopupController() {
  const { messages } = usePopupContext();

  return (
    <ul className="absolute w-full mt-16 pointer-events-none flex flex-col justify-center items-end gap-2 overflow-hidden max-h-full h-fit py-4">
      {messages.map((mess) => (
        <PopupCard key={mess.id} popupMessage={mess} variant={mess.type} />
      ))}
    </ul>
  );
}

export default PopupController;
