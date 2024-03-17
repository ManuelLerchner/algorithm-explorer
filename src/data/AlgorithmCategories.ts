import { ReactComponent as sortIcon } from "../assets/sort-icon.svg";
import { ReactComponent as graphIcon } from "../assets/graph-icon.svg";
import { ReactComponent as convexHullIcon } from "../assets/convex-hull-icon.svg";
import { ReactComponent as compressionIcon } from "../assets/compression-icon.svg";
import { ReactComponent as classificationIcon } from "../assets/classification-icon.svg";
import { ReactComponent as cryptographyIcon } from "../assets/cryptography-icon.svg";
import { ReactComponent as searchingIcon } from "../assets/searching-icon.svg";
import { ReactComponent as heapsIcon } from "../assets/heaps-icon.svg";
import { ReactComponent as quantumIcon } from "../assets/quantum-icon.svg";
import { ReactComponent as signalIcon } from "../assets/signal.svg";
import { AlgorithmCategory } from "../model/AlgorithmCategory";

export const AlgorithmCategories: AlgorithmCategory[] = [
  {
    name: "Sorting",
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
      {
        name: "Quick Sort",
        url: "/sorting/quick-sort",
        icon: sortIcon,
      },
    ],
  },
  {
    name: "Graph Traversal",
    description:
      "Graphs are a data structure that are used to represent a set of nodes and edges between them. There exist many different algorithms each of them with their set of strengths and weaknesses.",
    url: "/graph-traversal",
    icon: graphIcon,
    implementations: [
      {
        name: "Breadth First Search",
        url: "/graph-traversal/breadth-first-search",
        icon: graphIcon,
      },
      {
        name: "Depth First Search",
        url: "/graph-traversal/depth-first-search",
        icon: graphIcon,
      },
    ],
  },

  {
    name: "Signal Processing",
    description:
      "Signal Processing is a data structure that is used to represent a set of signals. There exist many different algorithms each of them with their set of strengths and weaknesses.",
    url: "/signal-processing",
    icon: signalIcon,
    implementations: [
      {
        name: "FFT",
        url: "/signal-processing/fft",
        icon: signalIcon,
      },
    ],
  },
];
