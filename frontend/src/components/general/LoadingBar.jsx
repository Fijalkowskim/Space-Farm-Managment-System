import React from "react";
import { cva } from "class-variance-authority";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const variants = cva("flex items-center justify-center text-2xl animate-spin", {
  variants: {
    variant: {
      default: "w-full h-full",
      screen: "h-screen",
      fullPage: "-mt-20 h-screen",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function LoadingBar({ className, children, variant, ...props }) {
  return (
    <div {...props} className={variants({ variant, className })}>
      <AiOutlineLoading3Quarters />
    </div>
  );
}

export default LoadingBar;
