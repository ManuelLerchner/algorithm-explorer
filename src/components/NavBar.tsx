import { AlgorithmCategoryProps } from "../models/AlgorithmCategoryProps";

function NavBar() {
  return (
    <div className="h-12 flex flex-row items-center justify-between px-16 bg-gray-800 drop-shadow-md text-2xl text-white">
      <div className="">
        <button>Home</button>
      </div>
      <div>
        <button>Theme</button>
      </div>
    </div>
  );
}

export default NavBar;
