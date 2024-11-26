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

export function debounce<A = unknown, R = void>(
  fn: (args: A) => R,
  ms: number,
): [(args: A) => Promise<R>, () => void] {
  let timer: NodeJS.Timeout;

  const debouncedFunc = (args: A): Promise<R> =>
    new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        resolve(fn(args));
      }, ms);
    });

  const teardown = () => clearTimeout(timer);

  return [debouncedFunc, teardown];
}

// eslint-disable
export function convertToMarkdownTable<T extends Record<string, unknown>>(data: T[]): string {
  if (data.length === 0) {
    return "No data available";
  }

  // Extract column names from the first row
  const columns = Object.keys(data[0]!);

  // Generate the header row
  const header = `| ${columns.join(" | ")} |`;

  // Generate the separator row
  const separator = `| ${columns.map(() => "---").join(" | ")} |`;

  // Generate the data rows
  const rows = data.map(row =>
    `| ${columns.map(col => row[col] ?? "").join(" | ")} |`
  );

  // Combine everything into a Markdown table
  return [header, separator, ...rows].join("\n");
}
// eslint-enable
