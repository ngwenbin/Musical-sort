import clsx from "clsx";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Button, Select } from "./components";
import "./index.css";
import { randomUniqueInts, Sorter, SortingAlgos, sortingAlgos } from "./utils";

const DEFAULT_MAX_RANGE = 3000;
const DEFAULT_MAX_COUNT = 120;
const DEFAULT_BAR_WIDTH = 5;

function App() {
  const [currData, setCurrData] = useState<Array<number>>(
    randomUniqueInts(DEFAULT_MAX_RANGE, DEFAULT_MAX_COUNT)
  );
  const [selectedAlgo, setSelectedAlgo] = useState<SortingAlgos>();
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const sorterRef = useRef<Sorter>();
  const currPointerRef = useRef<Array<number>>([currData[0]]); // To track which data bar(s) should be highlighted
  const dataStoreRef = useRef<Array<number>>([]); // Stores the current dataset

  const updateUiCallback = (
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

  const windowSizeChangeHandler = (): Array<number> => {
    const useable_screen_width = window.screen.width - 96;
    let max_count = Math.ceil(useable_screen_width / (DEFAULT_BAR_WIDTH + 1));

    max_count = max_count > DEFAULT_MAX_COUNT ? DEFAULT_MAX_COUNT : max_count;
    const randInts = randomUniqueInts(DEFAULT_MAX_RANGE, max_count);
    setCurrData(randInts);
    return randInts;
  };

  useEffect(() => {
    if (!sorterRef.current) {
      sorterRef.current = new Sorter(currData, updateUiCallback);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("resize", windowSizeChangeHandler);
    return () => {
      window.removeEventListener("resize", windowSizeChangeHandler);
    };
  }, []);

  const onSortClickHandler = async () => {
    setIsSorting(true);
    if (selectedAlgo && sorterRef?.current) {
      dataStoreRef.current = currData;
      await sorterRef.current.sort(selectedAlgo);
    }
    setIsSorting(false);
  };

  const onGenerateClickHandler = () => {
    const randInts = windowSizeChangeHandler();
    currPointerRef.current = [0];
    sorterRef?.current && sorterRef.current.update(randInts);
  };

  const onSelectSortingHandler = (e: SortingAlgos) => setSelectedAlgo(e);

  return (
    <div className="container flex flex-col gap-y-4 items-center h-full min-h-full mx-auto">
      <p className="text-3xl py-4 font-semibold">Musical sort</p>
      <div className="flex items-start gap-x-4 gap-y-2 flex-col md:flex-row md:items-center">
        <Select
          label="Algorithm:"
          labelOrient="hor"
          labelClassName="text-gray-700"
          options={sortingAlgos}
          onChangeHandler={(e) => onSelectSortingHandler(e as SortingAlgos)}
        />
        <div className="flex gap-2">
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
