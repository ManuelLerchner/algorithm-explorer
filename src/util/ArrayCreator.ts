import { ArrayType } from "../model/CustomPresetTypes";

/**
 * Creates an array of the specified length, of the specified type
 * @param arrayOrder The ordering type of the new array
 */
export function createArray(len: number, arrayOrder: ArrayType) {
  switch (arrayOrder) {
    case "random":
      return Array.from({ length: len }, (_) =>
        Math.floor(Math.random() * 100)
      );
    case "ascending":
      return Array.from({ length: len }, (_, i: number) => i + 1);
    case "descending":
      return Array.from({ length: len }, (_, i: number) => len - i);
    case "almostSorted":
      return Array.from(
        { length: len },
        (_, i: number) =>
          10 * (i + 1) + Math.round((2 * Math.random() - 1) * 15)
      );
  }
}
