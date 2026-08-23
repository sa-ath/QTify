import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar searchData={[]} />
        <Hero />
        <Routes>
          {/* Add your routes here */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
