import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { mapUrlToBreadcrumbs } from "../../components/NavBar/BreadcrumbHelper";
import AlgorithmNotFound from "../error/AlgorithmNotFound";
import { shiftIn } from "../../transitions";
import { getAlgorithm, getAlgorithmPage } from "./AlgorithmSelector";

function AlgorithmPage() {
  const location = useLocation();
  const { breadcrumbs } = mapUrlToBreadcrumbs(location.pathname);

  const category = breadcrumbs[breadcrumbs.length - 2]?.name;
  const algorithmName = breadcrumbs[breadcrumbs.length - 1].name;

  const AlgorithmPage = getAlgorithmPage(category);
  const { algorithm, pseudoCode } = getAlgorithm(category, algorithmName) ?? {};

  if (!AlgorithmPage || !algorithm || !pseudoCode) {
    return <AlgorithmNotFound algorithm={algorithmName} category={category} />;
  }

  return (
    <motion.div
      key="algorithm-page"
      variants={shiftIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col-reverse justify-around md:flex-row md:items-start items-center w-full h-[95vh] md:h-[calc(100vh-5rem)] md:my-auto"
    >
      <AlgorithmPage
        algorithmName={algorithmName}
        algorithm={algorithm}
        pseudoCode={pseudoCode}
      />
    </motion.div>
  );
}

export default AlgorithmPage;
