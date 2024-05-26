import React from "react";
import { SettingsContextProvider } from "./SettingsContext";
import { CultivationContextProvider } from "../cultivations/CultivationContext";
import { PopupContextProvider } from "./PopupContext";
import { CultivationDetailContextProvider } from "../cultivations/CultivationDetailsContext";
import { StationContextProvider } from "../StationContext";
import { PlantContextProvider } from "../dictionaries/PlantContext";
import { StageContextProvider } from "../StageContext";
import { ControlContextProvider } from "../ControlContext";
import { HarvestContextProvider } from "../HarvestContext";
import { MeasuredValueContextProvider } from "../MeasuredValueContext";
import { ReadingContextProvider } from "../ReadingContext";
import { CultivationTypeContextProvider } from "../dictionaries/CultivationTypeContext";
import { MeasureUnitContextProvider } from "../dictionaries/MeasureUnitContext";
import { StageTypeContextProvider } from "../dictionaries/StageTypeContext";
import { PersonContextProvider } from "../PersonContext";
import { DataCreationContextProvider } from "../general/DataCreationContext";
function ContextProvidersWrapper({ children }) {
  return (
    <PopupContextProvider>
      <PersonContextProvider>
        <DataCreationContextProvider>
          <CultivationDetailContextProvider>
            <StationContextProvider>
              <SettingsContextProvider>
                <CultivationContextProvider>
                  <PlantContextProvider>
                    <StageContextProvider>
                      <ControlContextProvider>
                        <HarvestContextProvider>
                          <MeasuredValueContextProvider>
                            <ReadingContextProvider>
                              <CultivationTypeContextProvider>
                                <MeasureUnitContextProvider>
                                  <StageTypeContextProvider>
                                    {children}
                                  </StageTypeContextProvider>
                                </MeasureUnitContextProvider>
                              </CultivationTypeContextProvider>
                            </ReadingContextProvider>
                          </MeasuredValueContextProvider>
                        </HarvestContextProvider>
                      </ControlContextProvider>
                    </StageContextProvider>
                  </PlantContextProvider>
                </CultivationContextProvider>
              </SettingsContextProvider>
            </StationContextProvider>
          </CultivationDetailContextProvider>
        </DataCreationContextProvider>
      </PersonContextProvider>
    </PopupContextProvider>
  );
}

export default ContextProvidersWrapper;
