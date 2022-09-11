import { ReactComponent as sortIcon } from "../assets/sort-icon.svg";
import { ReactComponent as graphIcon } from "../assets/graph-icon.svg";
import { ReactComponent as convexHullIcon } from "../assets/convex-hull-icon.svg";
import { ReactComponent as compressionIcon } from "../assets/compression-icon.svg";
import { ReactComponent as classificationIcon } from "../assets/classification-icon.svg";
import { ReactComponent as cryptographyIcon } from "../assets/cryptography-icon.svg";
import { ReactComponent as searchingIcon } from "../assets/searching-icon.svg";
import { ReactComponent as heapsIcon } from "../assets/heaps-icon.svg";
import { ReactComponent as quantumIcon } from "../assets/quantum-icon.svg";
import { AlgorithmCategory } from "../model/AlgorithmCategory";

//Temportary algorithm placeholders

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
    name: "Graphs",
    description:
      "Graphs are a data structure that are used to represent a set of nodes and edges between them. There exist many different algorithms each of them with their set of strengths and weaknesses.",
    url: "/graphs",
    icon: graphIcon,
    implementations: [
      {
        name: "Breadth First Search",
        url: "/graphs/breadth-first-search",
        icon: graphIcon,
      },
      {
        name: "Depth First Search",
        url: "/graphs/depth-first-search",
        icon: graphIcon,
      },
      {
        name: "Dijkstra's Algorithm",
        url: "/graphs/dijkstras-algorithm",
        icon: graphIcon,
      },
      {
        name: "Floyd Warshall Algorithm",
        url: "/graphs/floyd-warshall-algorithm",
        icon: graphIcon,
      },
      {
        name: "Prim's Algorithm",
        url: "/graphs/prims-algorithm",
        icon: graphIcon,
      },
      {
        name: "Kruskal's Algorithm",
        url: "/graphs/kruskals-algorithm",
        icon: graphIcon,
      },
    ],
  },
  {
    name: "Convex-Hull",
    description:
      "Convex hull is a data structure that is used to represent a set of points that are in a convex shape. There exist many different algorithms each of them with their set of strengths and weaknesses.",
    url: "/convex-hull",
    icon: convexHullIcon,
    implementations: [
      {
        name: "Graham Scan",
        url: "/convex-hull/graham-scan",
        icon: convexHullIcon,
      },
      {
        name: "Jarvis March",
        url: "/convex-hull/jarvis-march",
        icon: convexHullIcon,
      },
      {
        name: "Monotone Chain",
        url: "/convex-hull/monotone-chain",
        icon: convexHullIcon,
      },
    ],
  },
  {
    name: "Compression",
    description:
      "Compression is a data structure that is used to represent a set of items that are compressed into a smaller set of items. There exist many different algorithms each of them with their set of strengths and weaknesses.",
    url: "/compression",
    icon: compressionIcon,
    implementations: [
      {
        name: "LZW",
        url: "/compression/lzw",
        icon: compressionIcon,
      },
      {
        name: "Huffman",
        url: "/compression/huffman",
        icon: compressionIcon,
      },
      {
        name: "LZ77",
        url: "/compression/lz77",
        icon: compressionIcon,
      },
    ],
  },
  {
    name: "Classification",
    description:
      "Classification is a data structure that is used to represent a set of items that are classified into a set of categories. There exist many different algorithms each of them with their set of strengths and weaknesses.",
    url: "/classification",
    icon: classificationIcon,
    implementations: [
      {
        name: "K-Nearest Neighbors",
        url: "/classification/k-nearest-neighbors",
        icon: classificationIcon,
      },
      {
        name: "Naive Bayes",
        url: "/classification/naive-bayes",
        icon: classificationIcon,
      },
      {
        name: "Decision Trees",
        url: "/classification/decision-trees",
        icon: classificationIcon,
      },
      {
        name: "Random Forest",
        url: "/classification/random-forest",
        icon: classificationIcon,
      },
    ],
  },
  {
    name: "Cryptography",
    description:
      "Cryptography is a data structure that is used to represent a set of items that are encrypted or decrypted. There exist many different algorithms each of them with their set of strengths and weaknesses.",
    url: "/cryptography",
    icon: cryptographyIcon,

    implementations: [
      {
        name: "RSA",
        url: "/cryptography/rsa",
        icon: cryptographyIcon,
      },
      {
        name: "ElGamal",
        url: "/cryptography/elgamal",
        icon: cryptographyIcon,
      },
      {
        name: "Diffie-Hellman",
        url: "/cryptography/diffie-hellman",
        icon: cryptographyIcon,
      },
      {
        name: "Blowfish",
        url: "/cryptography/blowfish",
        icon: cryptographyIcon,
      },
      {
        name: "AES",
        url: "/cryptography/aes",
        icon: cryptographyIcon,
      },
      {
        name: "DES",
        url: "/cryptography/des",
        icon: cryptographyIcon,
      },
      {
        name: "Triple DES",
        url: "/cryptography/triple-des",
        icon: cryptographyIcon,
      },
      {
        name: "Rabbit",
        url: "/cryptography/rabbit",
        icon: cryptographyIcon,
      },
      {
        name: "RC5",
        url: "/cryptography/rc4",
        icon: cryptographyIcon,
      },
    ],
  },
  {
    name: "Searching",
    description:
      "Searching is a data structure that is used to represent a set of items that are searched for. There exist many different algorithms each of them with their set of strengths and weaknesses.",
    url: "/searching",
    icon: searchingIcon,
    implementations: [
      {
        name: "Binary Search",
        url: "/searching/binary-search",
        icon: searchingIcon,
      },
      {
        name: "Interpolation Search",
        url: "/searching/interpolation-search",
        icon: searchingIcon,
      },
      {
        name: "Quick-Search",
        url: "/searching/quick-search",
        icon: searchingIcon,
      },
      {
        name: "Jump Search",
        url: "/searching/jump-search",
        icon: searchingIcon,
      },
      {
        name: "Binary Search Tree",
        url: "/searching/binary-search-tree",
        icon: searchingIcon,
      },
      {
        name: "AVL Tree",
        url: "/searching/avl-tree",
        icon: searchingIcon,
      },
    ],
  },
  {
    name: "Heaps",
    description:
      "Heaps is a data structure that is used to represent a set of items that are stored in a heap. There exist many different algorithms each of them with their set of strengths and weaknesses.",
    url: "/heaps",
    icon: heapsIcon,
    implementations: [
      {
        name: "Binary Heap",
        url: "/heaps/binary-heap",
        icon: heapsIcon,
      },
      {
        name: "Fibonacci Heap",
        url: "/heaps/fibonacci-heap",
        icon: heapsIcon,
      },
      {
        name: "Leftist Heap",
        url: "/heaps/leftist-heap",
        icon: heapsIcon,
      },
      {
        name: "Binary Search Tree",
        url: "/heaps/binary-search-tree",
        icon: heapsIcon,
      },
    ],
  },
  {
    name: "Quantum",
    description:
      "Quantum is a data structure that is used to represent a set of items that are stored in a quantum. There exist many different algorithms each of them with their set of strengths and weaknesses.",
    url: "/quantum",
    icon: quantumIcon,
    implementations: [
      {
        name: "QFT",
        url: "/quantum/qft",
        icon: quantumIcon,
      },
    ],
  },
];
