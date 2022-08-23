/**
 * Resets the start-array
 * @param arrayOrder The ordering type of the new array
 */
export function createArray(
  arrayLength: number,
  arrayOrder: "random" | "ascending" | "descending"
) {
  switch (arrayOrder) {
    case "random":
      return Array.from({ length: arrayLength }, (_) =>
        Math.floor(Math.random() * 100)
      );
    case "ascending":
      return Array.from({ length: arrayLength }, (_, i: number) => i + 1);
    case "descending":
      return Array.from(
        { length: arrayLength },
        (_, i: number) => arrayLength - i
      );
  }
}
