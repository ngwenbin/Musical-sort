import { timeout } from ".";

export const sortingAlgos = ["Select", "Bubble", "Merge Sort"] as const;
export type SortingAlgos = typeof sortingAlgos[number];

export class Sorter {
  dataset: Array<number>;
  #stepCallback: (selected: Array<number>, updatedArr: Array<number>) => void;

  constructor(
    inputData: Array<number>,
    stepCallback: (selected: Array<number>, updatedArr: Array<number>) => void
  ) {
    inputData.length === 0 && this.#invalidDataSet();
    this.dataset = inputData.map((i) => i);
    this.#stepCallback = stepCallback;
  }

  sort = async (method: SortingAlgos) => {
    switch (method) {
      case "Bubble": {
        await this.#bubbleSort();
        break;
      }
      case "Merge Sort": {
        const res = await this.#mergeSort(this.dataset);
        this.dataset = [...res];
        break;
      }
      default:
    }
  };

  #invalidDataSet = () => {
    throw Error("Invalid data set.");
  };

  update = (inputData: Array<number>) => {
    inputData.length === 0 && this.#invalidDataSet();
    this.dataset = inputData.map((i) => i);
  };

  #bubbleSort = async () => {
    let isSorted = false;
    let arr = this.dataset;
    while (!isSorted) {
      isSorted = true;
      for (let i = 0; i < arr.length; i++) {
        const curr = arr[i];
        const next = arr[i + 1];

        await timeout(2);
        this.#stepCallback([arr[i]], arr);
        if (curr > next) {
          arr[i + 1] = curr;
          arr[i] = next;
          isSorted = false;
        }
      }
    }
    return arr;
  };

  #mergeHelper = async (
    left: Array<number>,
    right: Array<number>
  ): Promise<Array<number>> => {
    let sortedArr: Array<number> = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) {
        const leftShifted = left.shift();
        leftShifted && sortedArr.push(leftShifted);
      } else {
        const rightShifted = right.shift();
        rightShifted && sortedArr.push(rightShifted);
      }
      await timeout(2);
      this.#stepCallback([...left, ...right], []);
    }

    return [...sortedArr, ...left, ...right];
  };

  #mergeSort = async (arr: Array<number>): Promise<Array<number>> => {
    if (arr.length <= 1) {
      this.#stepCallback([...arr], []);
      return arr;
    }

    let mid = Math.ceil(arr.length / 2); // Get mid of array
    let left = await this.#mergeSort(arr.slice(0, mid));
    let right = await this.#mergeSort(arr.slice(mid));
    let merged = await this.#mergeHelper(left, right);
    this.#stepCallback([], [...new Set([...merged, ...this.dataset])]);
    return merged;
  };
}
