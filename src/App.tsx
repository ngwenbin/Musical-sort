import React, { useRef, useState } from "react";
import { useEffect } from "react";
import colors from "tailwindcss/colors";
import "./index.css";
import { randomUniqueInts, Sorter, sortingAlgos } from "./utils";

function App() {
  const stateRef = useRef<Array<number>>();
  const [currData, setCurrData] = useState(stateRef.current);
  const [sortingAlgo, setSortingAlgo] = useState<string>();
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const sorterRef = useRef<Sorter>();

  useEffect(() => {
    const randInts = randomUniqueInts(1000, 20);
    stateRef.current = randInts;
    setCurrData(stateRef.current);
  }, []);

  const stepUICallback = (elementPos: number, updatedArr: Array<number>) => {
    const currElement = document.getElementById(`bar_${elementPos}`);
    let prevElement = document.getElementById(`bar_${elementPos - 1}`);

    if (elementPos === 0) {
      prevElement = document.getElementById("bar_19");
    }
    currElement && (currElement.style.backgroundColor = `${colors.cyan[500]}`);
    prevElement && (prevElement.style.backgroundColor = `${colors.slate[900]}`);
    stateRef.current = updatedArr;
    setCurrData(stateRef.current);
  };

  const onSortClickHandler = () => {
    if (currData) {
      if (!sorterRef.current) {
        sorterRef.current = new Sorter(
          currData,
          stepUICallback,
          stateRef.current!
        );
      }
      setIsSorting(true);
      sorterRef.current.bubbleSort();
      setIsSorting(false);
    }
  };

  const onSelectSortingHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.target.value !== "Select" && setSortingAlgo(e.target.value);
  };

  return (
    <div className="container p-5 mx-auto flex flex-col items-center gap-y-4">
      <p className="text-3xl">Musical sort</p>
      <div>
        <label htmlFor="sortAlgo" className="mr-2 font-bold">
          Select sorting algorithmn:
        </label>
        <select
          name="sortAlgo"
          id="sortAlgo"
          onChange={(e) => onSelectSortingHandler(e)}
        >
          {sortingAlgos.map((item, key) => {
            return (
              <option key={key} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex gap-x-1 h-96 items-end justify-center bg-gray-100 rounded-md p-8">
        {currData &&
          currData.length > 0 &&
          currData.map((item, key) => {
            return (
              <div
                id={`bar_${key}`}
                key={key}
                className="bg-slate-900 w-4"
                style={{ height: Math.floor(item / 10) }}
              />
            );
          })}
      </div>
      <div>
        <button
          className="mt-4 px-5 py-2 bg-gray-900 text-white rounded-lg disabled:opacity-50"
          onClick={() => onSortClickHandler()}
          disabled={!Boolean(sortingAlgo) || isSorting}
        >
          {isSorting ? "Sorting..." : "Sort"}
        </button>
      </div>
    </div>
  );
}

export default App;
