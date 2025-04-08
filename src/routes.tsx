import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Faculty from './pages/faculty';
import Academic from './pages/academic';
import Research from './pages/research';
import Facilities from './pages/facilities';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/faculty" element={<Faculty />} />
      <Route path="/academic" element={<Academic />} />
      <Route path="/research" element={<Research />} />
      <Route path="/facilities" element={<Facilities />} />
    </Routes>
  );
};

export default AppRoutes;