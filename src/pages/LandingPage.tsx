import { AlgorithmCategories } from "../data/AlgorithmCategories";

import { motion } from "framer-motion";
import MenuLayout from "../components/Layout/MenuLayout";
import AlgorithmCategory from "../components/NavigationButton/NavigationButton";
import { shiftIn } from "../util/Transitions";

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
      <MenuLayout
        title="Algorithm Explorer"
        subtitle="Visualize some of the most important Algorithms in Computer Science."
        content={
          <div className="grid-cols-2 sm:grid-cols-3 grid gap-7 grid-flow-row-dense m-6 items-start">
            {AlgorithmCategories.map((algorithmType) => (
              <AlgorithmCategory
                key={algorithmType.name}
                name={algorithmType.name}
                Icon={algorithmType.icon}
                url={algorithmType.url}
              />
            ))}
          </div>
        }
      />
    </motion.div>
  );
}

export default StartPage;
