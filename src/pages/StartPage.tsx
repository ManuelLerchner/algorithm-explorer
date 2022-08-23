import { AlgorithmCategories } from "../data/AlgorithmCategories";

import AlgorithmCategory from "../components/NavigationButton";
import { motion } from "framer-motion";
import { shiftIn } from "./transitionProperties";

function StartPage() {
  return (
    <motion.div
      key="start-page"
      variants={shiftIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex items-center justify-center p-12 lg:p-16 my-auto"
    >
      <div className="flex items-center justify-around h-min w-full  flex-col lg:flex-row ">
        <div className="title max-w-xl h-fit lg:mr-12 text-center lg:text-left flex flex-col lg:items-start items-center my-4">
          <h1 className="dark:text-white text-5xl sm:text-6xl">
            Algorithm Explorer
          </h1>
          <h2 className="dark:text-white text-2xl my-8 sm:max-w-[90%]">
            Visualize some of the most important Algorithms in Computer Science.
          </h2>
        </div>
        <div className="grid-cols-2 sm:grid-cols-3 grid gap-7 grid-flow-row-dense m-6 items-start ">
          {AlgorithmCategories.map((algorithmType, i) => (
            <AlgorithmCategory
              key={i}
              name={algorithmType.category}
              Icon={algorithmType.icon}
              url={algorithmType.url}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default StartPage;
