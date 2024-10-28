import "@/styles/globals.css";
import * as React from "react";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/theme-provider";
import { NavBar } from "@/components/navigation-menu";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "ChatVPC",
  description: "An IQP Project from WPI",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>

          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col w-full min-h-screen">
              <NavBar />
              <div className="flex-grow bg-muted/40">
                {children}
              </div>
            </div>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
