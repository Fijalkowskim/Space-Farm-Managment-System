import React from "react";
import { SettingsContextProvider } from "./SettingsContext";
import { UserContextProvider } from "./UserContext";
import { CultivationContextProvider } from "../cultivations/CultivationContext";
import { PopupContextProvider } from "./PopupContext";
import { CultivationDetailContextProvider } from "../cultivations/CultivationDetailsContext";
import { StationContextProvider } from "../StationContext";
import { PlantContextProvider } from "../PlantContext";
import { StageContextProvider } from "../StageContext";
import { ControlContextProvider } from "../ControlContext";
import { HarvestContextProvider } from "../HarvestContext";
import { MeasuredValueContextProvider } from "../MeasuredValueContext";
import { ReadingContextProvider } from "../ReadingContext";
function ContextProvidersWrapper({ children }) {
  return (
    <PopupContextProvider>
      <CultivationDetailContextProvider>
        <StationContextProvider>
          <SettingsContextProvider>
            <UserContextProvider>
              <CultivationContextProvider>
                <PlantContextProvider>
                  <StageContextProvider>
                    <ControlContextProvider>
                      <HarvestContextProvider>
                        <MeasuredValueContextProvider>
                          <ReadingContextProvider>
                            {children}
                          </ReadingContextProvider>
                        </MeasuredValueContextProvider>
                      </HarvestContextProvider>
                    </ControlContextProvider>
                  </StageContextProvider>
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
