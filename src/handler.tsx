import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Unknown from "./pages/404";

const Handler = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aplicar" element={<Apply />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/logar" element={<Login />} />
      <Route path="/conta" element={<Account />} />
      <Route path="/*" element={<Unknown />} />
    </Routes>
  );
};

export default Handler;