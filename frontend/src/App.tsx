import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Topbar from "./components/Navbar";
function App() {
  return (
    <>
      <Topbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
