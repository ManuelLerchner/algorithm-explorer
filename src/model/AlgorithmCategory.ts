import { AlgorithmButton } from "./AlgorithmButton";

export interface AlgorithmCategory {
  name: string;
  description: string;
  url: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  implementations: AlgorithmButton[];
}
