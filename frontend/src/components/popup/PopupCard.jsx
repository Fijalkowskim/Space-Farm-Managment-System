import React from "react";
import { usePopupContext } from "../../context/PopupContext";
import { cva } from "class-variance-authority";
const variants = cva(
  "relative text-text-50 p-2 rounded-l-md w-full max-w-xs overflow-hidden z-[999] pl-7 shadow-md",
  {
    variants: {
      variant: {
        info: "bg-primary-600",
        error: "bg-red-600",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

const PopupCard = ({ className, variant, popupMessage, ...props }) => {
  const { removeMessage } = usePopupContext();
  const handleClick = () => {
    removeMessage(popupMessage.id);
  };
  return (
    <li className={variants({ variant, className })} {...props}>
      {popupMessage.message}
      <button
        className="absolute -top-[0.15rem] left-2 text-xl cursor-pointer pointer-events-auto"
        onClick={handleClick}
      >
        x
      </button>
    </li>
  );
};

export default PopupCard;
