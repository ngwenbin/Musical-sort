import clsx from "clsx";
import React from "react";

interface SelectProps extends React.HTMLAttributes<HTMLSelectElement> {
  options: Readonly<Array<string>>;
  defaultOptIdx?: number;
  label?: string;
  labelClassName?: string;
  labelOrient?: "ver" | "hor";
  onChangeHandler?: (value: string) => void;
}

const Select = ({
  options,
  defaultOptIdx = 0,
  label,
  labelClassName,
  labelOrient = "ver",
  onChangeHandler,
  ...props
}: SelectProps) => {
  return (
    <div className={clsx(labelOrient === "hor" && "flex items-center gap-x-2")}>
      {label && (
        <label
          htmlFor="select"
          className={clsx(
            "block text-sm font-normal text-gray-900",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <select
        id="select"
        name="select"
        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        defaultValue={options[defaultOptIdx]}
        onChange={(e) => {
          onChangeHandler && onChangeHandler(e.target.value);
        }}
        {...props}
      >
        {options.map((item, key) => {
          return (
            <option key={key} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
