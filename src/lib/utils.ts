import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// capitalizes the first letter of a given string
export function capitalizeFirstLetter(val: string) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

// given an an object and count, return an array of that object duplicated
export function replicateData<T>(data: T[], count: number): T[] {
  return Array(count).fill(data).flat();
}
