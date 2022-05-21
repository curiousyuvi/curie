import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <div className="bg-slate-300 w-full flex flex-col items-center">
        <Header />
        <div className="max-w-6xl w-full h-[calc(100vh-6rem)]">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
