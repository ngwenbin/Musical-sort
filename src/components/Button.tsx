import clsx from "clsx";
import React, { ReactNode } from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  buttonClassName?: string;
  children?: ReactNode;
  disabled?: boolean;
}

const Button = ({
  buttonClassName,
  children,
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium leading-4 text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        buttonClassName
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
