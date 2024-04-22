import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Homepage from "./pages/Homepage";
import Cultivations from "./pages/Cultivations";
import Resources from "./pages/Resources";
import Stations from "./pages/Stations";
import Workers from "./pages/Workers";
import Profile from "./pages/Profile";
import { useUserContext } from "./context/UserContext";
import Plants from "./pages/resourcesPages/Plants";
import MeasureUnits from "./pages/resourcesPages/MeasureUnits";
import StageTypes from "./pages/resourcesPages/StageTypes";
import CultivationTypes from "./pages/resourcesPages/CultivationTypes";
function App() {
  const { isLoggedIn } = useUserContext();
  return (
    <div className="overflow-x-hidden">
      <BrowserRouter>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Cultivations /> : <Homepage />}
          />
          <Route path="/resources" element={<Resources />} />
          <Route path="/stations" element={<Stations />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/measure-units" element={<MeasureUnits />} />
          <Route path="/stage-types" element={<StageTypes />} />
          <Route path="/cultivation-types" element={<CultivationTypes />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
