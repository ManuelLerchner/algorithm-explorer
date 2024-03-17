import { motion } from "framer-motion";
import React from "react";
import { SortingStep } from "../../model/Steps/SortingStep";
import { noPopUp, popUp } from "../../util/Transitions";
import { FFTStep } from "../../model/Steps/FFTStep";
import * as math from "mathjs";

export default function FFTArray({
  array,
  currentElementRef,
  animationActivated,
  type,
}: {
  array: math.Complex[];
  currentElementRef: React.RefObject<HTMLHeadingElement>;
  animationActivated: boolean;
  type?: string;
}) {
  return (
    <div className="flex">
      {array.map((value: math.Complex, i: number) => {
        return (
          <motion.div
            key={type + " entry" + i}
            variants={animationActivated ? popUp : noPopUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={"w-12 h-12 sm:w-16 md:w-24 border-2 bg-white mt-1"}
          >
            <div className="w-full h-full flex items-center justify-center">
              <span>{math.format(value, { precision: 2 })}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
