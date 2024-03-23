import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import MenuLayout from "../components/Layout/MenuLayout";
import AlgorithmCategory from "../components/NavigationButton/NavigationButton";
import { AlgorithmCategories } from "../data/AlgorithmCategories";
import { shiftIn } from "../util/Transitions";
import AlgorithmCategoryNotFound from "./Error/AlgorithmCategoryNotFound";

function CategoryPage() {
  const params = useParams();
  const algorithmCategory = params.category ?? "-";

  const algorithm = AlgorithmCategories.find((category) => {
    return category.url.substring(1) === algorithmCategory;
  })!;

  if (!algorithm) {
    return <AlgorithmCategoryNotFound category={algorithmCategory} />;
  }

  return (
    <motion.div
      key="category-page"
      variants={shiftIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex items-center justify-center p-12 lg:p-16 my-auto"
    >
      <MenuLayout
        title={algorithm.name}
        subtitle={algorithm.description}
        subSubtitle="Feel free to explore the algorithms in this category by selecting
        the the desired algorithm."
        content={
          <div className="grid-cols-2 sm:grid-cols-3 grid gap-7 grid-flow-row-dense m-6 items-start ">
            {algorithm.implementations.map((algorithm) => (
              <AlgorithmCategory
                key={algorithm.name}
                name={algorithm.name}
                Icon={algorithm.icon}
                url={algorithm.url}
              />
            ))}
          </div>
        }
      />
    </motion.div>
  );
}

export default CategoryPage;
