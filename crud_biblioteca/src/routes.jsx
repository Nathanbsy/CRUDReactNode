import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Livros from './pages/Livros';
import Add from './pages/Add';
import Update from './pages/Update';

function AppRoutes() {
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Livros />} />
        <Route path="add" element={<Add />} />
        <Route path="update" element={<Update />} />
      </Routes>
    </BrowserRouter>
}

export default AppRoutes;