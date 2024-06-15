import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { PopupMessage } from "../../models/popups/PopupMessage";
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

  const addMessage = (message, type = "info", timeout = 3000) => {
    const newId = uuidv4();
    setMessages((prev) => [...prev, new PopupMessage(newId, message, type)]);
    if (timeout <= 0) timeout = 3000;
    setTimeout(() => {
      setMessages((prev) => prev.filter((mess) => mess.id !== newId));
    }, timeout);
  };
  const logError = (err) => {
    if (err?.response?.data !== undefined) {
      const data = err.response.data;
      if (typeof data === "object" && data.message)
        addMessage(data.message, "error", 3000);
      else if (typeof data === "string" && data !== "")
        addMessage(data.message, "error", 3000);
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
        logError,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
}
