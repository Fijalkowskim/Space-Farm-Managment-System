import React from "react";
import { SettingsContextProvider } from "./SettingsContext";
import { UserContextProvider } from "./UserContext";
import { CultivationContextProvider } from "./cultivations/CultivationContext";
import { PopupContextProvider } from "./PopupContext";
import { CultivationDetailContextProvider } from "./cultivations/CultivationDetailsContext";
function ContextProvidersWrapper({ children }) {
  return (
    <PopupContextProvider>
      <CultivationDetailContextProvider>
        <SettingsContextProvider>
          <UserContextProvider>
            <CultivationContextProvider>{children}</CultivationContextProvider>
          </UserContextProvider>
        </SettingsContextProvider>
      </CultivationDetailContextProvider>
    </PopupContextProvider>
  );
}

export default ContextProvidersWrapper;
