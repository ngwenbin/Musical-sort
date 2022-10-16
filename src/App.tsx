import React, { useRef, useState } from "react";
import { useEffect } from "react";
import "./index.css";
import { randomUniqueInts, Sorter, sortingAlgos } from "./utils";

function App() {
  const [currData, setCurrData] = useState<Array<number>>();
  const [sortingAlgo, setSortingAlgo] = useState<string>();
  const sorterRef = useRef<Sorter>();

  useEffect(() => {
    const randInts = randomUniqueInts(1000, 20);
    setCurrData(randInts);
  }, []);

  const onSortClickHandler = () => {
    if (currData) {
      if (!sorterRef.current) {
        sorterRef.current = new Sorter(currData);
      }
      const sortedData = sorterRef.current.bubbleSort();
      setCurrData(sortedData);
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
          currData.map((item, key) => {
            return (
              <div
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
          disabled={!Boolean(sortingAlgo)}
        >
          Sort
        </button>
      </div>
    </div>
  );
}

export default App;
