import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SweetScroll from "sweet-scroll";
import StartPage from "./pages/StartPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="bg-gray-800 flex flex-col h-screen overflow-y-auto">
      <NavBar/>
      <StartPage />
    </div>
  );
}

export default App;
