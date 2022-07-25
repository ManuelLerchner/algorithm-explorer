import { AlgorithmCategoryProps } from "../models/AlgorithmCategoryProps";

function AlgorithmCategory({ name, icon, url }: AlgorithmCategoryProps) {
  return (
    <div className="flex flex-col items-center py-1 min-h-[8rem] hover:scale-105 transition-all ease-out cursor-pointer">
      <div className="flex justify-center items-center  flex-col ">
        <img
          src={icon}
          alt={icon}
          className="w-28 h-28 shadow-2xl shadow-zinc-600 my-1 "
        />
        <h3 className="text-white text-2xl text-center ">{name}</h3>
      </div>
    </div>
  );
}

export default AlgorithmCategory;
