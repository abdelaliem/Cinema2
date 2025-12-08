import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <BookingProvider>
        <div className="App">
          <header className="app-header">
            <div className="header-content">
              <h1>🎬 Cinema Booking</h1>
              <p>Reserve your seats and enjoy the movies</p>
            </div>
          </header>
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
          <footer className="app-footer">
            <p>&copy; 2024 Cinema Booking. All rights reserved.</p>
          </footer>
        </div>
      </BookingProvider>
    </Router>
  );
}

export default App;
