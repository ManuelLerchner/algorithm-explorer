/**
 * Resets the start-array
 * @param arrayOrder The ordering type of the new array
 */
export function createArray(
  len: number,
  arrayOrder: "random" | "ascending" | "descending" | "almostSorted"
) {
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
