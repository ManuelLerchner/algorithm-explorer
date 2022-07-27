import StartPage from "./pages/StartPage";
import NavBar from "./components/NavBar";
import { Router, Route, BrowserRouter, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(true);
  const toggleIsDark = () => setIsDark(!isDark);

  return (
    <div className={isDark ? "dark" : "light"}>
      <div className="bg-neutral-100 dark:bg-gray-800 flex flex-col h-screen overflow-y-auto transition-colors duration-500 ">
        <NavBar toggleIsDark={toggleIsDark} />

        <Routes>
          <Route path="/" element={<StartPage />}></Route>
          <Route path="/sorting" element={<> sorting</>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
