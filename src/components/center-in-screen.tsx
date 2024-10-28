import { ReactNode } from "react";

export const CenterInScreen = ({ children }: { children: ReactNode }) => {
  return (
    <div className={"flex justify-center p-2 fixed inset-0 items-center "} >
      {children}
    </div >
  );
}
