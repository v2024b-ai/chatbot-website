import { LoaderPinwheel } from "lucide-react";

export function LoadingSpinner({ big = false }: { big?: boolean }) {
  return (
    <div className={"flex justify-center p-2"}>
      <LoaderPinwheel
        className={`animate-spin ${big ? "size-16" : "size-10"}`}
      />
    </div>
  );
}

