import React from "react";
import AlgorithmCategory from "../components/AlgorithmCategory";

function StartPage() {
  return (
    <div className=" flex items-center justify-center   p-12 lg:p-16 min-h-[calc(100%-3rem)]  ">
      <div className="flex items-center justify-around h-min w-full  flex-col lg:flex-row ">
        <div className="title max-w-xl h-fit lg:mr-12 text-center lg:text-left flex flex-col lg:items-start items-center my-4">
          <h1 className="text-white text-5xl sm:text-6xl">
            Algorithm Explorer
          </h1>
          <h2 className="text-white text-2xl my-8 sm:max-w-[90%]">
            Visualize some of the most important Algorithms in Computer Science.
          </h2>
        </div>
        <div className="grid-cols-2 sm:grid-cols-3 grid gap-6 grid-flow-row-dense m-6 items-start ">
          <AlgorithmCategory name="Sorting" icon="💩" url="/" />
          <AlgorithmCategory name="Searching" icon="🔍" url="/" />
          <AlgorithmCategory name="Graphs" icon="📈" url="/" />

          <AlgorithmCategory name="Data Structures" icon="📚" url="/" />
          <AlgorithmCategory name="Data Structures" icon="📚" url="/" />
          <AlgorithmCategory name="Data Structures" icon="📚" url="/" />

          <AlgorithmCategory name="Data Structures" icon="📚" url="/" />
          <AlgorithmCategory name="Data Structures" icon="📚" url="/" />
          <AlgorithmCategory name="Data Structures" icon="📚" url="/" />
        </div>
      </div>
    </div>
  );
}

export default StartPage;
