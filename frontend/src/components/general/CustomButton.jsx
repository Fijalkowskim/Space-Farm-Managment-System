import React from "react";
import { cva } from "class-variance-authority";

const variants = cva(
  "flex items-center text-primary-950 justify-center px-3 py-1 rounded-md shadow-sm transition-colors text-center transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary-700 hover:bg-primary-800 text-text-50",
        inverted:
          "border-2 border-action-500 bg-primary-50 hover:bg-primary-100",
        green: "bg-green-500 hover:bg-green-600 text-primary-50",
        action: "bg-action-600 hover:bg-action-700 text-text-50",
        error: "bg-red-600 hover:bg-red-700 text-text-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function CustomButton({ className, children, variant, onClick, ...props }) {
  return (
    <button
      onClick={onClick}
      {...props}
      className={variants({ variant, className })}
    >
      {children}
    </button>
  );
}

export default CustomButton;
