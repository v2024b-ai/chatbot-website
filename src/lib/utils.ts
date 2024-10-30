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
  return data.flatMap((item) => Array(count).fill(item) as T[]);
}

// takes in an object and returns an array of strings, representing the keys of the obj
export function keysOf<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}
