import { motion } from "framer-motion";
import React from "react";
import { SortingStep } from "../../model/Steps/SortingStep";
import { shiftIn } from "../../util/Transitions";
import PseudoCodeBox from "../PseudoCodeBox/PseudoCodeBox";

export default function AlgoPageLayout({
  MainContent,
  Controller,
  GeneralSettings,
  algorithmName,
  pseudoCode,
  currentStep,
}: {
  MainContent: React.ReactNode;
  Controller: React.ReactNode;
  GeneralSettings: React.ReactNode;
  algorithmName: string;
  pseudoCode: string[];
  currentStep: SortingStep;
}) {
  return (
    <motion.div
      key="algorithm-page"
      variants={shiftIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col-reverse justify-around md:flex-row md:items-start items-center w-full h-[95vh] md:h-[calc(100vh-5rem)] md:my-auto"
    >
      <div className="flex flex-col w-11/12 md:max-w-4xl md:mr-4 overflow-auto scroll-container h-full py-16">
        {MainContent}
      </div>

      <div className="flex flex-col max-w-md mb-12 h-full overflow-y-auto py-6 pr-4">
        <h1 className="dark:text-white text-2xl sm:text-4xl my-4">
          {algorithmName}
        </h1>

        <PseudoCodeBox pseudoCode={pseudoCode} currentStep={currentStep} />

        {Controller}

        <h1 className="dark:text-white text-2xl sm:text-4xl my-4">Settings</h1>

        {GeneralSettings}
      </div>
    </motion.div>
  );
}
