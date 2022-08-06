import { Algorithm } from "./Algorithm";

export interface AlgorithmCategory {
  category: string;
  description: string;
  url: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  implementations: Algorithm[];
}
