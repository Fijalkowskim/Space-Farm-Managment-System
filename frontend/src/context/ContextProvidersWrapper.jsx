import React from "react";
import { SettingsContextProvider } from "./SettingsContext";
import { UserContextProvider } from "./UserContext";
import { CultivationContextProvider } from "./CultivationContext";
import { PopupContextProvider } from "./PopupContext";
function ContextProvidersWrapper({ children }) {
  return (
    <PopupContextProvider>
      <SettingsContextProvider>
        <UserContextProvider>
          <CultivationContextProvider>{children}</CultivationContextProvider>
        </UserContextProvider>
      </SettingsContextProvider>
    </PopupContextProvider>
  );
}

export default ContextProvidersWrapper;
