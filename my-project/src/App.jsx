// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import FlatList from './pages/FlatList';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flats" element={<FlatList />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
