import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Topbar from "./components/Navbar";
import NotFound from "./pages/404/NotFound";
function App() {
  return (
    <>
      <Topbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
