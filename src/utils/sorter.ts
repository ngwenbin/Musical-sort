export class Sorter {
  dataset: Array<number>;

  constructor(inputData: Array<number>) {
    inputData.length === 0 && this.#invalidDataSet();
    this.dataset = inputData;
  }

  #invalidDataSet = () => {
    throw Error("Invalid data set.");
  };

  update = (inputData: Array<number>) => {
    inputData.length === 0 && this.#invalidDataSet();
    this.dataset = inputData;
  };

  bubbleSort = () => {
    let isSorted = false;
    let arr = this.dataset;
    while (!isSorted) {
      isSorted = true;
      for (let i = 0; i < arr.length; i++) {
        const curr = arr[i];
        const next = arr[i + 1];

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
