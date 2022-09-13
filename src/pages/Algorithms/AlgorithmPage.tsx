import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { mapUrlToBreadcrumbs } from "../../components/NavBar/BreadcrumbHelper";
import AlgorithmNotFound from "../Error/AlgorithmNotFound";
import { shiftIn } from "../../util/Transitions";
import SortingPage from "./SortingPage/SortingPage";
import {
  getGraphTraversalAlgorithm,
  getSortingAlgorithm,
} from "../../util/AlgorithmSelector";
import GraphTraversalPage from "./GraphTraversalPage/GraphTraversalPage";

function getAlgorithmPage(category: string, algorithmName: string) {
  switch (category) {
    case "Sorting":
      const sortingAlgo = getSortingAlgorithm(algorithmName);
      if (!sortingAlgo) break;
      return <SortingPage {...sortingAlgo} />;
    case "Graph Traversal":
      const graphTravAlgo = getGraphTraversalAlgorithm(algorithmName);
      if (!graphTravAlgo) break;
      return <GraphTraversalPage {...graphTravAlgo} />;
  }
  return <AlgorithmNotFound algorithm={algorithmName} category={category} />;
}

function AlgorithmPage() {
  const location = useLocation();
  const { breadcrumbs } = mapUrlToBreadcrumbs(location.pathname);
  const category = breadcrumbs[breadcrumbs.length - 2]?.name;
  const algorithmName = breadcrumbs[breadcrumbs.length - 1].name;

  const AlgorithmPage = getAlgorithmPage(category, algorithmName);

  return (
    <motion.div
      key="algorithm-page"
      variants={shiftIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col-reverse justify-around md:flex-row md:items-start items-center w-full h-[95vh] md:h-[calc(100vh-5rem)] md:my-auto"
    >
      {AlgorithmPage}
    </motion.div>
  );
}

export default AlgorithmPage;
