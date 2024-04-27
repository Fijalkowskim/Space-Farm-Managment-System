import React from "react";
import { SettingsContextProvider } from "./SettingsContext";
import { UserContextProvider } from "./UserContext";
import { CultivationContextProvider } from "./CultivationContext";
function ContextProvidersWrapper({ children }) {
  return (
    <SettingsContextProvider>
      <UserContextProvider>
        <CultivationContextProvider>{children}</CultivationContextProvider>
      </UserContextProvider>
    </SettingsContextProvider>
  );
}

export default ContextProvidersWrapper;
