import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { FFTStep } from "../../model/Steps/FFTStep";
import FFTArray from "./FFTArray";

export default function FFTRecursiveStack({
  step,
  currentElementRef,
  animationActivated,
}: {
  step: FFTStep;
  currentElementRef: React.RefObject<HTMLHeadingElement>;
  animationActivated: boolean;
}) {
  return (
    <div className="flex flex-col w-max mx-auto">
      <AnimatePresence>
        {step.parentArrays.map((fftStep, stepNum) => (
          <FFTArray
            array={fftStep}
            currentElementRef={currentElementRef}
            animationActivated={animationActivated}
            key={"historyStep-" + stepNum}
          />
        ))}
        {step.resultArray !== undefined && (
          <>
            <motion.h1
              className="text-2xl font-bold mt-4 text-white"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              Result Array
            </motion.h1>

            <FFTArray
              array={step.resultArray}
              currentElementRef={currentElementRef}
              animationActivated={animationActivated}
              type="result"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
