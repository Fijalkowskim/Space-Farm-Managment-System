import React from "react";
import { SettingsContextProvider } from "./SettingsContext";
import { UserContextProvider } from "./UserContext";
function ContextProvidersWrapper({ children }) {
  return (
    <SettingsContextProvider>
      <UserContextProvider>{children}</UserContextProvider>
    </SettingsContextProvider>
  );
}

export default ContextProvidersWrapper;
