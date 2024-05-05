import React from "react";
import { SettingsContextProvider } from "./SettingsContext";
import { UserContextProvider } from "./UserContext";
import { CultivationContextProvider } from "./cultivations/CultivationContext";
import { PopupContextProvider } from "./PopupContext";
import { CultivationDetailContextProvider } from "./cultivations/CultivationDetailsContext";
import { StationContextProvider } from "./stations/StationContext";
function ContextProvidersWrapper({ children }) {
  return (
    <PopupContextProvider>
      <CultivationDetailContextProvider>
        <StationContextProvider>
          <SettingsContextProvider>
            <UserContextProvider>
              <CultivationContextProvider>
                {children}
              </CultivationContextProvider>
            </UserContextProvider>
          </SettingsContextProvider>
        </StationContextProvider>
      </CultivationDetailContextProvider>
    </PopupContextProvider>
  );
}

export default ContextProvidersWrapper;
