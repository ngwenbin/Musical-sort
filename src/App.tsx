import { useRef, useState } from "react";
import { useEffect } from "react";
import { BarView, Button, Select } from "./components";
import { randomUniqueInts, Sorter, SortingAlgos, sortingAlgos } from "./utils";
import {
  DEFAULT_MAX_COUNT,
  DEFAULT_MAX_RANGE,
  DEFAULT_BAR_WIDTH,
  DEFAULT_MIN_RANGE,
} from "./constants";
import "./index.css";
import clsx from "clsx";

function App() {
  const [currData, setCurrData] = useState<Array<number>>(
    randomUniqueInts(DEFAULT_MAX_COUNT, DEFAULT_MAX_RANGE, DEFAULT_MIN_RANGE)
  );
  const [selectedAlgo, setSelectedAlgo] = useState<SortingAlgos>("Bubble");
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(false);
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

  if (!sorterRef.current) {
    sorterRef.current = new Sorter(currData, updateUiCallback);
  }

  const windowSizeChangeHandler = (): Array<number> => {
    const useable_screen_width = window.screen.width - 96;
    let max_count = Math.ceil(useable_screen_width / (DEFAULT_BAR_WIDTH + 1));

    max_count = max_count > DEFAULT_MAX_COUNT ? DEFAULT_MAX_COUNT : max_count;
    const randInts = randomUniqueInts(
      max_count,
      DEFAULT_MAX_RANGE,
      DEFAULT_MIN_RANGE
    );
    setCurrData(randInts);
    return randInts;
  };

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
  const onSoundToggleHandler = () => {
    setIsSoundOn((val) => !val);
    sorterRef.current?.toggleSound();
  };
  return (
    <div className="container flex flex-col gap-y-4 items-center h-full min-h-screen justify-center mx-auto">
      <div className="flex flex-col items-center">
        <p className="text-3xl py-4 font-semibold">Musical sort</p>
        <div className="flex items-start gap-x-4 gap-y-2 flex-col md:flex-row md:items-center">
          <Select
            label="Algorithm:"
            labelOrient="hor"
            labelClassName="text-gray-700"
            options={sortingAlgos}
            defaultOptIdx={sortingAlgos.indexOf(selectedAlgo)}
            onChangeHandler={(e) => onSelectSortingHandler(e as SortingAlgos)}
            disabled={isSorting}
          />
          <div className="flex gap-2">
            <Button
              onClick={() => onSortClickHandler()}
              disabled={!selectedAlgo || isSorting}
            >
              {isSorting ? "Sorting..." : "Sort"}
            </Button>
            <Button
              onClick={() => onGenerateClickHandler()}
              disabled={isSorting}
            >
              Generate
            </Button>
          </div>
          <Button
            onClick={() => onSoundToggleHandler()}
            buttonClassName={clsx(
              isSoundOn
                ? "!text-green-700 !bg-green-100 !hover:bg-green-200 !focus:ring-green-500"
                : "!text-red-700 !bg-red-100 !hover:bg-red-200 !focus:ring-red-500"
            )}
          >
            Sound {isSoundOn ? "ON" : "OFF"}
          </Button>
        </div>
        <BarView data={currData} pointerStack={currPointerRef.current} />
      </div>
    </div>
  );
}

export default App;
