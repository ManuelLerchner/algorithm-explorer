import { useParams } from "react-router-dom";
import AlgorithmCategory from "../components/NavigationButton";
import { AlgorithmCategories } from "../data/AlgorithmCategories";
import AlgorithmCategoryNotFound from "./error/AlgorithmCategoryNotFound";
import { motion } from "framer-motion";
import { shiftIn } from "./transitionProperties";

function CategoryPage() {
  const params = useParams();

  const algorithmCategory = params.algorithmCategory;

  const algorithmExists = AlgorithmCategories.some(
    (algorithm) => algorithm.category.toLowerCase() === algorithmCategory
  );

  if (!algorithmExists) {
    return <AlgorithmCategoryNotFound />;
  }

  const algorithm = AlgorithmCategories.find(
    (algorithm) => algorithm.category.toLowerCase() === algorithmCategory
  )!;

  return (
    <motion.div
      key="algorithms-page"
      variants={shiftIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex items-center justify-center p-12 lg:p-16 my-auto overfk"
    >
      <div className="flex items-center justify-around h-min w-full  flex-col lg:flex-row ">
        <div className="title max-w-xl h-fit lg:mr-12 text-center lg:text-left flex flex-col lg:items-start items-center my-4">
          <h1 className="dark:text-white text-5xl sm:text-6xl">
            {algorithm.category}
          </h1>
          <h2 className="dark:text-white text-2xl my-8">
            {algorithm.description}
          </h2>
          <h3 className="dark:text-white text-xl">
            Feel free to explore the algorithms in this category by selecting
            the the desired algorithm.
          </h3>
        </div>
        <div className="grid-cols-2 sm:grid-cols-3 grid gap-7 grid-flow-row-dense m-6 items-start ">
          {algorithm.implementations.map((algorithm, i) => (
            <AlgorithmCategory
              key={i}
              name={algorithm.name}
              Icon={algorithm.icon}
              url={algorithm.url}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default CategoryPage;
