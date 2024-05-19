import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import About from "./pages/About";
import Admin from "./pages/Admin";

const Handler = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aplicar" element={<Apply />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default Handler;