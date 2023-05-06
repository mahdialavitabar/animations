import "./App.css";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./Components";
import Animations from "./Components/Animations";

function App() {
  const userAgent = navigator.userAgent;
  const archRegex =
    /(?:\b|; )((?:arm64|ia64|x64|ppc64le|ppc64|ppc|sparc64|sparc|x86_64|x86|i[3-6]86|mips64le|mips|mips64|riscv64|riscv|wasm|wasm64|aarch64|aarch|Intel Mac OS X)[^;\)]*)/i;
  const match = userAgent.match(archRegex);
  const architecture = match && match[1] ? match[1] : "unknown";
  console.log(architecture);
  console.log(navigator.userAgent);

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
