import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AlgorithmPage from "./pages/Algorithms/AlgorithmPage";
import CategoryPage from "./pages/CategoryPage";
import PageDoesNotExist from "./pages/Error/PageDoesNotExist";
import StartPage from "./pages/LandingPage";

function App() {
  const [isDark, setIsDark] = useState(true);
  const toggleIsDark = () => setIsDark(!isDark);

  const location = useLocation();

  return (
    <div className={isDark ? "dark" : "light"}>
      <div className="bg-neutral-100 dark:bg-gray-800 flex flex-col min-h-screen transition-colors duration-500 overflow-x-hidden">
        <NavBar toggleIsDark={toggleIsDark} />
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.key}>
            <Route path="/" element={<StartPage />} />
            <Route path="/:category" element={<CategoryPage />} />
            <Route path="/:category/:algorithm" element={AlgorithmPage()} />
            <Route path="*" element={<PageDoesNotExist />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
