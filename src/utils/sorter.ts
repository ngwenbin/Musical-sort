import { timeout } from ".";

export const sortingAlgos = ["Select", "Bubble"];

export class Sorter {
  dataset: Array<number>;
  stepCallback: (elementPos: number, updatedArr: Array<number>) => void;
  arrayStore: Array<number>;

  constructor(
    inputData: Array<number>,
    stepCallback: (step: number, updatedArr: Array<number>) => void,
    arrayStore: Array<number>
  ) {
    inputData.length === 0 && this.#invalidDataSet();
    this.dataset = inputData;
    this.stepCallback = stepCallback;
    this.arrayStore = arrayStore;
  }

  #invalidDataSet = () => {
    throw Error("Invalid data set.");
  };

  update = (inputData: Array<number>) => {
    inputData.length === 0 && this.#invalidDataSet();
    this.dataset = inputData;
  };

  bubbleSort = async () => {
    let isSorted = false;
    let arr = this.dataset;
    while (!isSorted) {
      isSorted = true;
      for (let i = 0; i < arr.length; i++) {
        const curr = arr[i];
        const next = arr[i + 1];

        await timeout(30);
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
