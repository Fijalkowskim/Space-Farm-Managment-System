import React from "react";
import { SettingsContextProvider } from "./SettingsContext";
import { UserContextProvider } from "./UserContext";
import { CultivationContextProvider } from "./cultivations/CultivationContext";
import { PopupContextProvider } from "./PopupContext";
import { CultivationDetailContextProvider } from "./cultivations/CultivationDetailsContext";
import { StationContextProvider } from "./StationContext";
import { PlantContextProvider } from "./PlantContext";
import { StageContextProvider } from "./StageContext";
function ContextProvidersWrapper({ children }) {
  return (
    <PopupContextProvider>
      <CultivationDetailContextProvider>
        <StationContextProvider>
          <SettingsContextProvider>
            <UserContextProvider>
              <CultivationContextProvider>
                <PlantContextProvider>
                  <StageContextProvider>{children}</StageContextProvider>
                </PlantContextProvider>
              </CultivationContextProvider>
            </UserContextProvider>
          </SettingsContextProvider>
        </StationContextProvider>
      </CultivationDetailContextProvider>
    </PopupContextProvider>
  );
}

export default ContextProvidersWrapper;
