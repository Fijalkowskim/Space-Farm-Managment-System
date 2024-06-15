import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};
export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};
