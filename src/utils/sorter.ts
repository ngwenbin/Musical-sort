import { timeout } from ".";

export const sortingAlgos = ["Select", "Bubble"];

export class Sorter {
  dataset: Array<number>;
  stepCallback: (elementPos: number, updatedArr: Array<number>) => void;

  constructor(
    inputData: Array<number>,
    stepCallback: (step: number, updatedArr: Array<number>) => void
  ) {
    inputData.length === 0 && this.#invalidDataSet();
    this.dataset = inputData.map((i) => i);
    this.stepCallback = stepCallback;
  }

  #invalidDataSet = () => {
    throw Error("Invalid data set.");
  };

  update = (inputData: Array<number>) => {
    inputData.length === 0 && this.#invalidDataSet();
    this.dataset = inputData.map((i) => i);
  };

  bubbleSort = async () => {
    let isSorted = false;
    let arr = this.dataset;
    while (!isSorted) {
      isSorted = true;
      for (let i = 0; i < arr.length; i++) {
        const curr = arr[i];
        const next = arr[i + 1];

        await timeout(8);
        this.stepCallback(i, arr);
        if (curr > next) {
          arr[i + 1] = curr;
          arr[i] = next;
          isSorted = false;
        }
      }
    }
    return arr;
  };
}
