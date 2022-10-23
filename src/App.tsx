import clsx from "clsx";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Button, Select } from "./components";
import "./index.css";
import { randomUniqueInts, Sorter, sortingAlgos } from "./utils";

function App() {
  const [currData, setCurrData] = useState<Array<number>>([]);
  const [sortingAlgo, setSortingAlgo] = useState<string>();
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const sorterRef = useRef<Sorter>();
  const currPointerRef = useRef<number>(0);

  const stepUICallback = (elementPos: number, updatedArr: Array<number>) => {
    currPointerRef.current = elementPos;
    const newArr = [...updatedArr];
    setCurrData(newArr);
  };

  useEffect(() => {
    const randInts = randomUniqueInts(3000, 60);
    setCurrData(randInts);
    if (!sorterRef.current) {
      sorterRef.current = new Sorter(randInts, stepUICallback);
    }
  }, []);

  const onSortClickHandler = async () => {
    setIsSorting(true);
    sorterRef?.current && (await sorterRef.current.bubbleSort());
    setIsSorting(false);
  };

  const onGenerateClickHandler = async () => {
    const randInts = randomUniqueInts(3000, 30);
    currPointerRef.current = 0;
    setCurrData(randInts);
    sorterRef?.current && (await sorterRef.current.update(randInts));
  };

  const onSelectSortingHandler = (e: string) => setSortingAlgo(e);

  return (
    <div className="container p-5 mx-auto flex flex-col items-center gap-y-4">
      <p className="text-3xl py-4 font-semibold">Musical sort</p>
      <div className="flex items-center gap-x-4">
        <Select
          label="Algorithm:"
          labelOrient="hor"
          options={sortingAlgos}
          onChangeHandler={(e) => onSelectSortingHandler(e)}
        />
        <Button
          onClick={() => onSortClickHandler()}
          disabled={!Boolean(sortingAlgo) || isSorting}
        >
          {isSorting ? "Sorting..." : "Sort"}
        </Button>
        <Button onClick={() => onGenerateClickHandler()} disabled={isSorting}>
          Generate
        </Button>
      </div>
      <div className=" mt-10 flex gap-x-1 items-end justify-center bg-blue-100 rounded-md px-6 pt-6 justify-self-end min-h-full">
        {currData.length > 0 &&
          currData.map((item, key) => {
            return (
              <div
                id={`bar_${key}`}
                key={key}
                className={clsx(
                  "w-2",
                  currPointerRef.current === key
                    ? "bg-cyan-500"
                    : "bg-slate-900"
                )}
                style={{ height: Math.floor(item / 8) }}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
