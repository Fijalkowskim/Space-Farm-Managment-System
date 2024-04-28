import { ReactNode, createContext, useContext, useState } from "react";
import { PopupMessage } from "../models/popups/PopupMessage";
import { v4 as uuidv4 } from "uuid";

const PopupContext = createContext();

export function usePopupContext() {
  return useContext(PopupContext);
}

export function PopupContextProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const clearMessages = () => {
    setMessages([]);
  };

  const addMessage = (message, type, timeout) => {
    const newId = uuidv4();
    setMessages((prev) => [...prev, new PopupMessage(newId, message, type)]);
    if (timeout) {
      if (timeout <= 0) timeout = 3000;
      setTimeout(() => {
        setMessages((prev) => prev.filter((mess) => mess.id !== newId));
      }, timeout);
    }
  };
  const removeMessage = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };
  return (
    <PopupContext.Provider
      value={{
        messages,
        clearMessages,
        addMessage,
        removeMessage,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
}
