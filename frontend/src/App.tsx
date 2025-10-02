import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Topbar from "./components/Navbar";
import NotFound from "./pages/404/NotFound";
function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" && <Topbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
