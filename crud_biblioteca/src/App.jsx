import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Livros from './pages/Livros';
import Add from './pages/Add.jsx';
import Update from './pages/Update.jsx';
import Detalhes from './pages/Detalhes.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Livros />} />
        <Route path="detalhes" element={<Detalhes />} />
        <Route path="add" element={<Add />} />
        <Route path="update" element={<Update />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
