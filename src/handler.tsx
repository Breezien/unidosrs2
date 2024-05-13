import { Routes, Route } from "react-router-dom";
import Home from "./home/App";
import Apply from "./apply/App";
import About from "./about/App";
import Admin from "./admin/App";

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