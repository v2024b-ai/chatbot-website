import { type ReactNode } from "react";

export const CenterInScreen = ({ children }: { children: ReactNode }) => {
  return (
    <div className={"fixed inset-0 z-0 flex items-center justify-center p-2"}>
      {children}
    </div>
  );
};
