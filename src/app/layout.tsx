import "@/styles/globals.css";

import * as React from "react"

import { cn } from "@/lib/utils"

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import Link from "next/link"

import { TRPCReactProvider } from "@/trpc/react";

import { ThemeProvider } from "@/components/theme-provider";

import { ModeToggle } from "@/components/theme-toggle";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export const metadata: Metadata = {
  title: "ChatVPC",
  description: "An IQP Project from WPI",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

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
          <div className="bg-primary pt-4">
          <NavigationMenu>
            <div className="flex justify-between items-center w-full p-2">
            <NavigationMenuList className="flex space-x-2">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-primary`}>Home</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-primary hover:bg-secondary">Evaluations</NavigationMenuTrigger>
              <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                <NavigationMenuLink asChild>
                <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/eval"
                  >
                <div className="mb-2 mt-4 text-lg font-medium">
                  Evaluations
                </div>
                <p className="text-sm leading-tight text-muted-foreground">
                  See what we found about different Large Language Models
                </p>
                </a>
                </NavigationMenuLink>
                </li>
                </ul>
              </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-primary hover:bg-secondary">Tools</NavigationMenuTrigger>
              <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                <NavigationMenuLink asChild>
                <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/tools"
                  >
                <div className="mb-2 mt-4 text-lg font-medium">
                  Tools
                </div>
                <p className="text-sm leading-tight text-muted-foreground">
                  Look at the awesome tools that we have made for future projects
                </p>
                </a>
                </NavigationMenuLink>
                </li>
                <ListItem href="/tools/chatbot" title="Chatbot">
                  Use the chatbot to ask questions about specific VPC IQPs
                </ListItem>
                </ul>
              </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            
              <div className="ml-auto">
                <ModeToggle />
              </div>
            </div>
          </NavigationMenu>
          </div>
          {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
