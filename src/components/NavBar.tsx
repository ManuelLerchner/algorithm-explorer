import { useNavigate } from "react-router-dom";
import { AlgorithmCategoryProps } from "../models/AlgorithmCategoryProps";

function NavBar({ toggleIsDark }: { toggleIsDark: () => void }) {
  const navigate = useNavigate();

  function goToRoute(url: string) {
    navigate(url);
  }

  return (
    <div className="h-12 flex flex-row items-center justify-between px-16 bg-neutral-200 dark:bg-gray-800 drop-shadow-md text-2xl dark:text-white">
      <div className="">
        <button onClick={() => goToRoute("/")}>Home</button>
      </div>
      <div>
        <button onClick={toggleIsDark}>Toggle light & dark</button>
      </div>
    </div>
  );
}

export default NavBar;
