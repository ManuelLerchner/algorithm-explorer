import { useLocation } from "react-router-dom";
import { mapUrlToBreadcrumbs } from "../../components/NavBar/BreadcrumbHelper";
import SortingPage from "./SortingPage/SortingPage";
import {
  getConvexHullAlgorithm,
  getGraphTraversalAlgorithm,
  getSignalProcessingAlgorithm,
  getSortingAlgorithm,
} from "../../util/AlgorithmSelector";
import GraphTraversalPage from "./GraphTraversalPage/GraphTraversalPage";
import AlgorithmNotFound from "../Error/AlgorithmNotFound";
import SignalProcessingPage from "./SignalProcessingPage/SignalProcessingPage";
import ConvexHullPage from "./ConvexHullPage/ConvexHullPage";

function AlgorithmPage() {
  const location = useLocation();
  const { breadcrumbs } = mapUrlToBreadcrumbs(location.pathname);
  const category = breadcrumbs[breadcrumbs.length - 2]?.name;
  const algorithmName = breadcrumbs[breadcrumbs.length - 1].name;

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
      case "Signal Processing":
        const signalProcessingAlgo =
          getSignalProcessingAlgorithm(algorithmName);
        if (!signalProcessingAlgo) break;
        return <SignalProcessingPage {...signalProcessingAlgo} />;
      case "Convex Hull":
        const convexHullAlgo = getConvexHullAlgorithm(algorithmName);
        if (!convexHullAlgo) break;
        return <ConvexHullPage {...convexHullAlgo} />;
    }
    return <AlgorithmNotFound algorithm={algorithmName} category={category} />;
  }

  return <>{getAlgorithmPage(category, algorithmName)}</>;
}

export default AlgorithmPage;
