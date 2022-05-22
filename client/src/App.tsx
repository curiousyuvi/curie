import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Router>
      <div className="w-full h-full flex justify-center items-center p-4">
        <div className="flex flex-col w-full h-full max-w-6xl">
          <Header />
          <div className="w-full h-full flex ">
            <Navbar />
            <div className="h-full w-full rounded-br-lg overflow-hidden">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/create-room" element={<Settings />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
