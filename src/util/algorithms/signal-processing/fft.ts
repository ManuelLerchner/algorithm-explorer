import * as math from "mathjs";
import { FFTStep } from "../../../model/Steps/FFTStep";

const fftPseudoCode = [
  "function fft(A) {",
  " if (A.length <= 1) return A;",
  " let even = A[0, 2, 4, ...];",
  " let odd = A[1, 3, 5, ...];",
  " let fft_even = fft(even);",
  " let fft_odd = fft(odd);",
  " let omega = exp(2 * PI * i / n);",
  " let result = Array(n);",
  " for (let k = 0; k < n/2; k++) {",
  "   omega_k = pow(omega, k)",
  "   result[k] = fft_even[k] + omega_k * fft_odd[k];",
  "   result[k + n/2] = fft_even[k] - omega_k * fft_odd[k];",
  " }",
  " return result;",
  "}",
];

function formatComplex<T>(complex: T): string {
  return math.format(complex, { precision: 2 });
}

function fft_real(A: math.Complex[]): math.Complex[] {
  let N = A.length;
  if (N === 1) return A;
  let even = A.filter((_, i) => i % 2 === 0);
  let odd = A.filter((_, i) => i % 2 === 1);
  let fft_even = fft_real(even);
  let fft_odd = fft_real(odd);
  let result: math.Complex[] = Array(N);
  for (let k = 0; k < N / 2; k++) {
    let omega_k = math.exp(math.complex(0, (-2 * Math.PI * k) / N));
    result[k] = math.add(
      fft_even[k],
      math.multiply(omega_k, fft_odd[k]) as math.Complex
    );
    result[k + N / 2] = math.subtract(
      fft_even[k],
      math.multiply(omega_k, fft_odd[k]) as math.Complex
    );
  }
  return result;
}

function* fft_helper(
  A: math.Complex[],
  parentArrays: math.Complex[][]
): IterableIterator<FFTStep> {
  if (A.length <= 1) {
    yield {
      currentArray: A,
      parentArrays: parentArrays,
      codeRow: 2,
      description: {
        type: "Finished",
        description: `Array length is less than or equal to 1, returning array`,
      },
      variables: {
        result: formatComplex(A),
      },
    };
    return A;
  }
  let even = A.filter((_, i) => i % 2 === 0);
  yield {
    currentArray: A,
    parentArrays: parentArrays,
    codeRow: 3,
    description: {
      type: "Calculated",
      description: `Calculate even array`,
    },
    variables: { even: formatComplex(even) },
  };
  let odd = A.filter((_, i) => i % 2 === 1);
  yield {
    currentArray: A,
    parentArrays: parentArrays,
    codeRow: 4,
    description: {
      type: "Calculated",
      description: `Calculate odd array`,
    },
    variables: { odd: formatComplex(odd), even: formatComplex(even) },
  };

  yield {
    currentArray: A,
    parentArrays: parentArrays,
    codeRow: 5,
    description: {
      type: "Call",
      description: `Call fft recursively on even array`,
    },
    variables: { even: formatComplex(even), odd: formatComplex(odd) },
  };

  yield* fft_helper(even, [...parentArrays, even]);
  let fft_even = fft_real(even);

  yield {
    currentArray: A,
    parentArrays: parentArrays,
    codeRow: 6,
    description: {
      type: "Call",
      description: `Call fft recursively on odd array`,
    },
    variables: {
      fft_even: formatComplex(fft_even),
      odd: formatComplex(odd),
    },
  };

  yield* fft_helper(odd, [...parentArrays, odd]);
  let fft_odd = fft_real(odd);

  let omega = math.exp(math.complex(0, (2 * Math.PI) / A.length));

  yield {
    currentArray: A,
    parentArrays: parentArrays,
    codeRow: 7,
    description: {
      type: "Calculated",
      description: `Calculate omega`,
    },
    variables: {
      fft_even: formatComplex(fft_even),
      fft_odd: formatComplex(fft_odd),
      omega: formatComplex(omega),
    },
  };

  let result: math.Complex[] = Array(A.length).fill(undefined);

  yield {
    currentArray: A,
    parentArrays: parentArrays,
    resultArray: result,
    codeRow: 8,
    description: {
      type: "Set",
      description: `Set result to Array(` + A.length + `)`,
    },
    variables: {
      omega: formatComplex(omega),
      fft_even: formatComplex(fft_even),
      fft_odd: formatComplex(fft_odd),
    },
  };

  for (let k = 0; k < A.length / 2; k++) {
    let omega_k = math.pow(omega, k);
    result[k] = math.add(
      fft_even[k],
      math.multiply(omega_k, fft_odd[k]) as math.Complex
    );

    yield {
      currentArray: A,
      parentArrays: parentArrays,
      resultArray: result,
      codeRow: 11,
      description: {
        type: "Set",
        description: `Set result[${k}] to ${formatComplex(
          fft_even[k]
        )} + ${formatComplex(omega_k)} * ${formatComplex(fft_odd[k])}`,
      },
      variables: {
        omega_k: formatComplex(omega_k),
        fft_even: formatComplex(fft_even),
        fft_odd: formatComplex(fft_odd),
      },
    };

    result[k + A.length / 2] = math.subtract(
      fft_even[k],
      math.multiply(omega_k, fft_odd[k]) as math.Complex
    );
    yield {
      currentArray: A,
      parentArrays: parentArrays,
      resultArray: result,
      codeRow: 12,
      description: {
        type: "Set",
        description: `Set result[${k + A.length / 2}] to ${formatComplex(
          fft_even[k]
        )} - ${formatComplex(omega_k)} * ${formatComplex(fft_odd[k])}`,
      },
      variables: {
        omega_k: formatComplex(omega_k),
        fft_even: formatComplex(fft_even),
        fft_odd: formatComplex(fft_odd),
      },
    };
  }

  yield {
    currentArray: A,
    parentArrays: parentArrays,
    resultArray: result,
    codeRow: 14,
    description: {
      type: "Finished",
      description: `Returning result`,
    },
    variables: { result: formatComplex(result) },
  };

  return result;
}

function* fft(A: math.Complex[]): IterableIterator<FFTStep> {
  yield* fft_helper(A, [A]);
}

export const fftInfo = {
  algorithmName: "FFT",
  algorithm: fft,
  pseudoCode: fftPseudoCode,
};
