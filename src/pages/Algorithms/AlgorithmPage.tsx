import { useLocation } from "react-router-dom";
import { mapUrlToBreadcrumbs } from "../../components/NavBar/BreadcrumbHelper";
import AlgorithmNotFound from "../error/AlgorithmNotFound";
import { getAlgorithm, getAlgorithmPage } from "./AlgorithmHelper";

function AlgorithmPage() {
  const location = useLocation();
  const { breadcrumbs } = mapUrlToBreadcrumbs(location.pathname);

  const category = breadcrumbs[breadcrumbs.length - 2].name;
  const algorithmName = breadcrumbs[breadcrumbs.length - 1].name;

  const AlgorithmPage = getAlgorithmPage(category);
  const { algorithm, pseudoCode } = getAlgorithm(category, algorithmName) ?? {};

  if (!AlgorithmPage || !algorithm || !pseudoCode) {
    return <AlgorithmNotFound algorithm={algorithmName} category={category} />;
  }

  return <AlgorithmPage algorithmName={algorithmName} algorithm={algorithm} pseudoCode={pseudoCode} />;
}

export default AlgorithmPage;
