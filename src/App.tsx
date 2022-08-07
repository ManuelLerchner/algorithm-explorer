import StartPage from "./pages/StartPage";
import NavBar from "./components/NavBar";
import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import CategoryPage from "./pages/CategoryPage";
import { AnimatePresence } from "framer-motion";
import SortingPage from "./pages/Algorithms/SortingPage";

function App() {
  const [isDark, setIsDark] = useState(true);
  const toggleIsDark = () => setIsDark(!isDark);

  const location = useLocation();

  return (
    <div className={isDark ? "dark" : "light"}>
      <div className="bg-neutral-100 dark:bg-gray-800 flex flex-col h-screen overflow-y-auto transition-colors duration-500 overflow-x-hidden">
        <NavBar toggleIsDark={toggleIsDark} />

        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<StartPage />} />
            <Route path="/:algorithmCategory" element={<CategoryPage />} />
            <Route path="/sorting/:sortingAlgorithm" element={<SortingPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
