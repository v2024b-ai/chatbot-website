import { LoaderPinwheel } from "lucide-react";
import type { ReactNode } from "react";

export function LoadingSpinner({ big = false, center = false, children }: { big?: boolean, center?: boolean, children?: ReactNode }) {
  return (
    <div className={`flex justify-center p-2 ${center && "fixed inset-0 flex items-center justify-center"}`}>
      <LoaderPinwheel
        className={`animate-spin ${big ? "size-16" : "size-10"}`}
      />
      {children}
    </div>
  );
}

