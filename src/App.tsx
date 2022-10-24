import clsx from "clsx";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Button, Select } from "./components";
import "./index.css";
import { randomUniqueInts, Sorter, SortingAlgos, sortingAlgos } from "./utils";

const DEFAULT_MAX_RANGE = 3000;
const DEFAULT_MAX_COUNT = 120;

function App() {
  const [currData, setCurrData] = useState<Array<number>>(
    randomUniqueInts(DEFAULT_MAX_RANGE, DEFAULT_MAX_COUNT)
  );
  const [selectedAlgo, setSelectedAlgo] = useState<SortingAlgos>();
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const sorterRef = useRef<Sorter>();
  const currPointerRef = useRef<Array<number>>([currData[0]]);
  const dataStoreRef = useRef<Array<number>>([]);

  const stepUICallback = (
    selected: Array<number>,
    updatedArr: Array<number>
  ) => {
    currPointerRef.current = [...selected];
    const newArr = [
      ...(updatedArr.length > 0 ? updatedArr : dataStoreRef.current),
    ];
    setCurrData(newArr);
    dataStoreRef.current = newArr;
  };

  useEffect(() => {
    if (!sorterRef.current) {
      sorterRef.current = new Sorter(currData, stepUICallback);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSortClickHandler = async () => {
    setIsSorting(true);
    if (selectedAlgo && sorterRef?.current) {
      dataStoreRef.current = currData;
      await sorterRef.current.sort(selectedAlgo);
    }
    setIsSorting(false);
  };

  const onGenerateClickHandler = async () => {
    const randInts = randomUniqueInts(3000, 120);
    currPointerRef.current = [0];
    setCurrData(randInts);
    sorterRef?.current && sorterRef.current.update(randInts);
  };

  const onSelectSortingHandler = (e: SortingAlgos) => setSelectedAlgo(e);

  return (
    <div className="container p-5 flex flex-col gap-y-4 items-center h-full min-h-full mx-auto">
      <p className="text-3xl py-4 font-semibold">Musical sort</p>
      <div className="flex items-center gap-x-4">
        <Select
          label="Algorithm:"
          labelOrient="hor"
          labelClassName="text-gray-700"
          options={sortingAlgos}
          onChangeHandler={(e) => onSelectSortingHandler(e as SortingAlgos)}
        />
        <Button
          onClick={() => onSortClickHandler()}
          disabled={!selectedAlgo || isSorting}
        >
          {isSorting ? "Sorting..." : "Sort"}
        </Button>
        <Button onClick={() => onGenerateClickHandler()} disabled={isSorting}>
          Generate
        </Button>
      </div>
      <div className=" mt-10 flex items-end bg-black rounded-lg px-6 pt-6 pb-0.5 flex-1 justify-center max-w-fit gap-[1px]">
        {currData &&
          currData.length > 0 &&
          currData.map((item, key) => {
            return (
              <div
                id={`bar_${key}`}
                key={key}
                className={clsx(
                  "w-[5px]",
                  // currPointerRef.current &&
                  currPointerRef.current.includes(item)
                    ? "bg-red-600"
                    : "bg-white"
                )}
                style={{ height: Math.floor(item / 10) }}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
