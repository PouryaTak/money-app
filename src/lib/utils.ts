import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addCommas = (num: any) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const removeNonNumeric = (num: any) =>
  num.toString().replace(/[^0-9]/g, "");
