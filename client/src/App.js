import './App.css';
import { Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Policy' element={<Policy />} />
        <Route path='*' element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
