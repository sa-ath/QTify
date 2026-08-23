import './App.css';
import { BrowserRouter, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Section from './Components/Section/Section';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar searchData={[]} />
        <Hero />
        <main>
          <Section title="Top Albums" />
        </main>
        <Routes>
          {/* Add your routes here */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
