import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Homepage from "./pages/Homepage";
import Cultivations from "./pages/Cultivations";
import Resources from "./pages/Resources";
import Stations from "./pages/Stations";
import Workers from "./pages/Workers";
import Profile from "./pages/Profile";
import { useUserContext } from "./context/UserContext";
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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
