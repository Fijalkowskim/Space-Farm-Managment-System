import React, { Children } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Homepage from "../../pages/Homepage";
import Cultivations from "../../pages/Cultivations";
import Resources from "../../pages/Resources";
import Stations from "../../pages/Stations";
import Workers from "../../pages/Workers";
import Profile from "../../pages/Profile";
import Plants from "../../pages/resourcesPages/Plants";
import MeasureUnits from "../../pages/resourcesPages/MeasureUnits";
import StageTypes from "../../pages/resourcesPages/StageTypes";
import CultivationTypes from "../../pages/resourcesPages/CultivationTypes";
import CultivationDetails from "../../pages/detailsPages/CultivationDetails";
import StationDetails from "../../pages/detailsPages/StationDetails";
import { usePersonContext } from "../../context/PersonContext";
import WorkerDetails from "../../pages/detailsPages/WorkerDetails";
import PlantDetails from "../../pages/detailsPages/PlantDetails";
import DataCreationFormWrapper from "../../pages/DataCreationFormWrapper";
import ScrollToTop from "./ScrollToTop";
import CultivationTypeDetails from "../../pages/detailsPages/CultivationTypeDetails";
import StageDetails from "../../pages/detailsPages/StageDetails";
import ControlDetails from "../../pages/detailsPages/ControlDetails";
import MeasuredValues from "../../pages/MeasuredValues";
function AppRouter() {
  const { isLoggedIn } = usePersonContext();
  return (
    <>
      {isLoggedIn && <Navbar />}
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Cultivations /> : <Homepage />}
        />
        <Route path="/resources" element={<Resources />} />
        <Route path="/stations" element={<Stations />} />
        <Route path="/measuredValues" element={<MeasuredValues />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/measure-units" element={<MeasureUnits />} />
        <Route path="/stage-types" element={<StageTypes />} />
        <Route path="/cultivation-types" element={<CultivationTypes />} />

        <Route
          path="/create/:creationType"
          element={<DataCreationFormWrapper />}
        />

        <Route path="/cultivation/:id" element={<CultivationDetails />} />
        <Route path="/stage/:id" element={<StageDetails />} />
        <Route path="/station/:id" element={<StationDetails />} />
        <Route path="/control/:id" element={<ControlDetails />} />
        <Route path="/worker/:id" element={<WorkerDetails />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default AppRouter;
