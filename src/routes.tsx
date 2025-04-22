import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Faculty from "./pages/faculty";
import Academic from "./pages/academic";
import Research from "./pages/research";
import Facilities from "./pages/facilities";
import Placements from "./pages/placements";
import Gallery from "./pages/Gallery/gallery";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/about" element={<About />} />
      <Route path="placements" element={<Placements />} />
      <Route path="/research" element={<Research />} />
      <Route path="/faculty" element={<Faculty />} />
      <Route path="/academic" element={<Academic />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/facilities" element={<Facilities />} />
    </Routes>
  );
};

export default AppRoutes;
