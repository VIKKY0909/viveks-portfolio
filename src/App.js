// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/ProjectPage';
import Skills from './components/Skills';
import Contact from './components/Contact';
import MyDigitalFootprint from './components/MyDigitalFootprint'; // Added new component

const App = () => {
  return (
    <Router>
      <div className="relative">
        <Navigation />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-digital-footprint" element={<MyDigitalFootprint />} /> {/* Added new route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
