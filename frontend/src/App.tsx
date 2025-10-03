import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import NotFound from "./pages/404/NotFound";
import Contact from "./pages/contact/Contact";
import Topbar from "./components/Navbar";
import Footer from "./pages/footer/Footer";

function App() {
  const location = useLocation();

  const showTopbar =
    location.pathname === "/" || location.pathname === "/contact";
  const showFooter =
    location.pathname === "/" || location.pathname === "/contact";

  return (
    <>
      {showTopbar && <Topbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
}

export default App;
