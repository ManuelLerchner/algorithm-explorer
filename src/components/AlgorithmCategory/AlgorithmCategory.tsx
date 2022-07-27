import { AlgorithmCategoryProps } from "../../models/AlgorithmCategoryProps";
import { useNavigate } from "react-router-dom";
import "./AlgorithmCategory.css";

function AlgorithmCategory({ name, Icon, url }: AlgorithmCategoryProps) {
  const navigate = useNavigate();

  function goToRoute() {
    navigate(url);
  }

  return (
    <div
      onClick={goToRoute}
      className="flex flex-col items-center py-1 min-h-[8rem] hover:scale-105 transition-all ease-out cursor-pointer"
    >
      <div className="flex justify-center items-center flex-col">
        <div
          className={
            "w-28 h-28 shadow-xl shadow-stone-400 dark:shadow-gray-600 bg-zinc-300 dark:bg-neutral-200/90 rounded-md mb-2  "
          }
        >
          <Icon className="w-full h-full dropShadow p-3 hover:p-[0.65rem] transition-all ease-in" />
        </div>
        <h3 className="dark:text-neutral-200 text-2xl text-center tracking-wide font-medium ">
          {name}
        </h3>

      </div>
    </div>
  );
}

export default AlgorithmCategory;
