import { Routes, Route } from "react-router-dom";
import Home from "./home/App";
import Apply from "./apply/App";

const Handler = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aplicar" element={<Apply />} />
    </Routes>
  );
};

export default Handler;