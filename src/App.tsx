import React from "react";
import logo from "./logo.svg";
import './index.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./page/Home";
import { ContextProvider } from "./context/Context";
import Pokemon from "./page/Pokemon";
import Navbar from "./components/Navbar";
import Mixmig from "./components/Mixmig";
function App() {
  return (
    <ContextProvider >
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/mix" element={<Mixmig />}></Route>
          <Route path="/:id" element={<Home />}></Route>
          <Route path="/Pokemon/:id" element={<Pokemon />}></Route>
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
