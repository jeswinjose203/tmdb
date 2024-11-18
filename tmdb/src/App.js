import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Chat from './Chat';
import AboutMovies from './About_Movies';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about_movies" element={<AboutMovies />} />
        <Route path="/chatgpt" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
