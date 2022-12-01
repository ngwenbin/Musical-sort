import React from "react";
import clsx from "clsx";
import { DEFAULT_MIN_RANGE } from "../constants";

interface BarViewProps {
  data: Array<number>;
  pointerStack: Array<number>;
}

const BarView = ({ data, pointerStack }: BarViewProps) => {
  return (
    <div className=" mt-10 flex items-end bg-black rounded-lg px-6 pt-6 pb-0.5 flex-1 justify-center max-w-fit gap-[1px]">
      {data &&
        data.length > 0 &&
        data.map((item, key) => {
          return (
            <div
              id={`bar_${key}`}
              key={key}
              className={clsx(
                "w-[5px]",
                pointerStack.includes(item) ? "bg-red-600" : "bg-white"
              )}
              style={{ height: Math.floor((item - DEFAULT_MIN_RANGE + 1) / 1) }}
            />
          );
        })}
    </div>
  );
};

export default BarView;
