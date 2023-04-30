import "./App.css";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./Components";
import Animations from "./Components/Animations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/animations" element={<Animations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
