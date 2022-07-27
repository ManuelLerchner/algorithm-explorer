import { ReactComponent as sortIcon } from "../assets/sort-icon.svg";
import { ReactComponent as graphIcon } from "../assets/graph-icon.svg";
import { ReactComponent as convexHullIcon } from "../assets/convex-hull-icon.svg";
import { ReactComponent as compressionIcon } from "../assets/compression-icon.svg";
import { ReactComponent as classificationIcon } from "../assets/classification-icon.svg";
import { ReactComponent as cryptographyIcon } from "../assets/cryptography-icon.svg";
import { ReactComponent as searchingIcon } from "../assets/searching-icon.svg";
import { ReactComponent as heapsIcon } from "../assets/heaps-icon.svg";
import { ReactComponent as quantumIcon } from "../assets/quantum-icon.svg";


import AlgorithmCategory from "../components/AlgorithmCategory/AlgorithmCategory";

function StartPage() {
  return (
    <div className=" flex items-center justify-center p-12 lg:p-16 my-auto  ">
      <div className="flex items-center justify-around h-min w-full  flex-col lg:flex-row ">
        <div className="title max-w-xl h-fit lg:mr-12 text-center lg:text-left flex flex-col lg:items-start items-center my-4">
          <h1 className="dark:text-white text-5xl sm:text-6xl">
            Algorithm Explorer
          </h1>
          <h2 className="dark:text-white text-2xl my-8 sm:max-w-[90%]">
            Visualize some of the most important Algorithms in Computer Science.
          </h2>
        </div>
        <div className="grid-cols-2 sm:grid-cols-3 grid gap-7 grid-flow-row-dense m-6 items-start ">
          <AlgorithmCategory name="Sorting" Icon={sortIcon} url="/sorting" />
          <AlgorithmCategory name="Graphs" Icon={graphIcon} url="/" />
          <AlgorithmCategory name="Convex Hull" Icon={convexHullIcon} url="/" />
          <AlgorithmCategory name="Compression" Icon={compressionIcon} url="/" />
          <AlgorithmCategory name="Classification" Icon={classificationIcon} url="/" />
          <AlgorithmCategory name="Cryptography" Icon={cryptographyIcon} url="/" />
          <AlgorithmCategory name="Searching" Icon={searchingIcon} url="/" />
          <AlgorithmCategory name="Heaps" Icon={heapsIcon} url="/" />
          <AlgorithmCategory name="Quantum" Icon={quantumIcon} url="/" />
        </div>
      </div>
    </div>
  );
}

export default StartPage;
