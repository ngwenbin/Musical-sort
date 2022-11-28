import { timeout, SoundPlayer } from ".";

export const sortingAlgos = ["Bubble", "Merge Sort"] as const;
export type SortingAlgos = typeof sortingAlgos[number];

const DELAY = 5; // in ms

export class Sorter {
  dataset: Array<number>;
  /**
   * Calls the exposed UI callback function for UI updates
   */
  #stepCallback: (selected: Array<number>, updatedArr: Array<number>) => void;
  #soundPlayer: SoundPlayer;

  constructor(
    inputData: Array<number>,
    stepCallback: (selected: Array<number>, updatedArr: Array<number>) => void
  ) {
    inputData.length === 0 && this.#invalidDataSet();
    this.dataset = inputData.map((i) => i);
    this.#stepCallback = stepCallback;
    this.#soundPlayer = new SoundPlayer();
  }

  /**
   * Public method to start sorting process
   * @param method String literal for sorting algo selection
   */
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
        break;
    }
  };

  toggleSound = () => {
    this.#soundPlayer.toggleSound();
  };

  #invalidDataSet = () => {
    throw Error("Invalid data set.");
  };

  /**
   * Public method to update data variable in Sorter class
   * @param inputData Array of numbers
   */
  update = (inputData: Array<number>) => {
    inputData.length === 0 && this.#invalidDataSet();
    this.dataset = inputData.map((i) => i);
  };

  /**
   * Bubble sort algorithmn
   */
  #bubbleSort = async () => {
    let isSorted = false;
    let arr = this.dataset;
    while (!isSorted) {
      isSorted = true;
      for (let i = 0; i < arr.length; i++) {
        const curr = arr[i];
        const next = arr[i + 1];

        await timeout(DELAY);
        this.#stepCallback([arr[i]], arr);
        this.#soundPlayer.playTone(arr[i]);
        if (curr > next) {
          arr[i + 1] = curr;
          arr[i] = next;
          isSorted = false;
        }
      }
    }
    return arr;
  };

  /**
   * Helper for mergeSort
   */
  #mergeHelper = async (
    left: Array<number>,
    right: Array<number>
  ): Promise<Array<number>> => {
    let sortedArr: Array<number> = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) {
        const leftShifted = left.shift();
        if (leftShifted) {
          sortedArr.push(leftShifted);
          this.#soundPlayer.playTone(leftShifted);
        }
      } else {
        const rightShifted = right.shift();
        if (rightShifted) {
          sortedArr.push(rightShifted);
          this.#soundPlayer.playTone(rightShifted);
        }
      }
      await timeout(DELAY);
      this.#stepCallback([...left, ...right], []); // Update UI pointer
    }
    return [...sortedArr, ...left, ...right];
  };

  /**
   * Mergesort algorithmn
   */
  #mergeSort = async (
    arr: Array<number>,
    leftRemainder: Array<number> = [],
    rightRemainder: Array<number> = []
  ): Promise<Array<number>> => {
    if (arr.length <= 1) {
      this.#stepCallback([...arr], []); // Update UI pointer
      return arr;
    }
    const mid = Math.ceil(arr.length / 2); // Get mid of array
    const leftElements = arr.slice(0, mid);
    const rightElements = arr.slice(mid);

    // Stack right interior nodes with previous level's remainder nodes and right subtree if any.
    const left = await this.#mergeSort(leftElements, leftRemainder, [
      ...rightElements,
      ...rightRemainder,
    ]);

    // Stack left interior nodes with previous level's remainder nodes and left subtree if any.
    const right = await this.#mergeSort(
      rightElements,
      [...leftRemainder, ...left],
      rightRemainder
    );

    const merged = await this.#mergeHelper(left, right);
    this.#stepCallback([], [...leftRemainder, ...merged, ...rightRemainder]); // Update displayed data

    return merged;
  };
}
