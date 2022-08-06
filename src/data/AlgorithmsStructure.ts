// <AlgorithmCategory name="Graphs" Icon={graphIcon} url="/" />
// <AlgorithmCategory name="Convex Hull" Icon={convexHullIcon} url="/" />
// <AlgorithmCategory name="Compression" Icon={compressionIcon} url="/" />
// <AlgorithmCategory name="Classification" Icon={classificationIcon} url="/" />
// <AlgorithmCategory name="Cryptography" Icon={cryptographyIcon} url="/" />
// <AlgorithmCategory name="Searching" Icon={searchingIcon} url="/" />
// <AlgorithmCategory name="Heaps" Icon={heapsIcon} url="/" />
// <AlgorithmCategory name="Quantum" Icon={quantumIcon} url="/" />

import { ReactComponent as sortIcon } from "../assets/sort-icon.svg";
import { ReactComponent as graphIcon } from "../assets/graph-icon.svg";
import { ReactComponent as convexHullIcon } from "../assets/convex-hull-icon.svg";
import { ReactComponent as compressionIcon } from "../assets/compression-icon.svg";
import { ReactComponent as classificationIcon } from "../assets/classification-icon.svg";
import { ReactComponent as cryptographyIcon } from "../assets/cryptography-icon.svg";
import { ReactComponent as searchingIcon } from "../assets/searching-icon.svg";
import { ReactComponent as heapsIcon } from "../assets/heaps-icon.svg";
import { ReactComponent as quantumIcon } from "../assets/quantum-icon.svg";

export const Algorithms = [
  {
    category: "Sorting",
    description:
      "Sorting algorithms are used to sort a list of items. There exist many different algorithms each of them with their set of strengths and weaknesses.",
    url: "/sorting",
    icon: sortIcon,
    implementations: [
      {
        name: "Bubble Sort",
        url: "/sorting/bubble-sort",
        icon: sortIcon,
      },
      {
        name: "Selection Sort",
        url: "/sorting/selection-sort",
        icon: sortIcon,
      },
      {
        name: "Insertion Sort",
        url: "/sorting/insertion-sort",
        icon: sortIcon,
      },
    ],
  },
];
