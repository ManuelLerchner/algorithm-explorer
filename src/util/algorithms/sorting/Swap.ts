export function swap(A: number[], a: number, b: number) {
  let temp = A[a];
  A[a] = A[b];
  A[b] = temp;
}
