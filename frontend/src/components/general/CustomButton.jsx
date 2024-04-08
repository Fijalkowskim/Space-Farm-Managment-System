import React from "react";
import { cva } from "class-variance-authority";

const variants = cva(
  "flex items-center text-primary-950 justify-center px-2 py-1 rounded-md shadow-sm transition-colors text-center mx-auto transition-all font-light",
  {
    variants: {
      variant: {
        default: "bg-action-500 hover:bg-action-600 text-primary-50 ",
        inverted:
          "border-2 border-action-500 bg-primary-50 hover:bg-primary-100",
        primary: "bg-primary-500 hover:bg-primary-600 text-primary-50 ",
        green: "bg-green-500 hover:bg-green-600 text-primary-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function CustomButton({ className, children, variant, ...props }) {
  return (
    <button {...props} className={variants({ variant, className })}>
      {children}
    </button>
  );
}

export default CustomButton;