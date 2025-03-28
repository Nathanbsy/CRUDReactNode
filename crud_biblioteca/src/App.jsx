import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Livros from './pages/Livros';
import Add from './pages/Add';
import Update from './pages/Update';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Livros />} />
        <Route path="add" element={<Add />} />
        <Route path="update" element={<Update />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
