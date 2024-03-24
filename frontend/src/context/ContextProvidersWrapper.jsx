import React from "react";
import { SettingsContextProvider } from "./SettingsContext";

function ContextProvidersWrapper({ children }) {
  return <SettingsContextProvider>{children}</SettingsContextProvider>;
}

export default ContextProvidersWrapper;
