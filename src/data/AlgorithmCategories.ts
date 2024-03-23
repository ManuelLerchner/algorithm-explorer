import { ReactComponent as astarIcon } from "../assets/astar.svg";
import { ReactComponent as breadthFirstIcon } from "../assets/breadth-first.svg";
import { ReactComponent as bubbleIcon } from "../assets/bubble.svg";
import { ReactComponent as convexHullIcon } from "../assets/convex-hull-icon.svg";
import { ReactComponent as depthFirstIcon } from "../assets/depth-first.svg";
import { ReactComponent as dijkstraIcon } from "../assets/dijkstra.svg";
import { ReactComponent as fftIcon } from "../assets/fft.svg";
import { ReactComponent as grahamIcon } from "../assets/graham.svg";
import { ReactComponent as graphIcon } from "../assets/graph-icon.svg";
import { ReactComponent as insertionIcon } from "../assets/insertion.svg";
import { ReactComponent as jarvisIcon } from "../assets/jarvis-march.svg";
import { ReactComponent as quickIcon } from "../assets/quick.svg";
import { ReactComponent as routeIcon } from "../assets/route.svg";
import { ReactComponent as selectionIcon } from "../assets/selection.svg";
import { ReactComponent as signalIcon } from "../assets/signal.svg";
import { ReactComponent as sortIcon } from "../assets/sort-icon.svg";
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
        icon: bubbleIcon,
      },
      {
        name: "Selection Sort",
        url: "/sorting/selection-sort",
        icon: selectionIcon,
      },
      {
        name: "Insertion Sort",
        url: "/sorting/insertion-sort",
        icon: insertionIcon,
      },
      {
        name: "Quick Sort",
        url: "/sorting/quick-sort",
        icon: quickIcon,
      },
    ],
  },
  {
    name: "Graph Traversal",
    description:
      "Graphs are a data structure that is used to represent a set of nodes. There exist different algorithms to search through the graph each of them with their set of strengths and weaknesses.",
    url: "/graph-traversal",
    icon: graphIcon,
    implementations: [
      {
        name: "Breadth First Search",
        url: "/graph-traversal/breadth-first-search",
        icon: breadthFirstIcon,
      },
      {
        name: "Depth First Search",
        url: "/graph-traversal/depth-first-search",
        icon: depthFirstIcon,
      },
    ],
  },
  {
    name: "Signal Processing",
    description:
      "Signal Processing algorithms are used to process data. Some of the most common algorithms are used to process audio and image data.",
    url: "/signal-processing",
    icon: signalIcon,
    implementations: [
      {
        name: "FFT",
        url: "/signal-processing/fft",
        icon: fftIcon,
      },
    ],
  },
  {
    name: "Convex Hull",
    description:
      "Convex Hulls are used to find the smallest convex polygon that contains all the points in a set. There exist many different algorithms each of them with their set of strengths and weaknesses.",
    url: "/convex-hull",
    icon: convexHullIcon,
    implementations: [
      {
        name: "Graham's Scan",
        url: "/convex-hull/grahams-scan",
        icon: grahamIcon,
      },
      {
        name: "Jarvis March",
        url: "/convex-hull/jarvis-march",
        icon: jarvisIcon,
      },
      {
        name: "Quick Hull",
        url: "/convex-hull/quick-hull",
        icon: quickIcon,
      },
    ],
  },
  {
    name: "Path Finding",
    description:
      "Pathfinding algorithms are used to find the shortest path between two points. There exist many different algorithms each of them with their set of strengths and weaknesses.",
    url: "/pathfinding",
    icon: routeIcon,
    implementations: [
      {
        name: "Dijkstra",
        url: "/pathfinding/dijkstra",
        icon: dijkstraIcon,
      },
      {
        name: "A*",
        url: "/pathfinding/a-star",
        icon: astarIcon,
      },
    ],
  },
];
