import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; href: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function NavBar() {
  return (
    <header className="z-1000 top-0 flex items-center justify-between gap-4 border-b p-4">
      <div className="pl-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()}`}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Evaluations</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/eval"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Evaluations
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          See what we found about different Large Language
                          Models
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/eval/add-model" title="Add A Model">
                    Test and add a model to our database!
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/tools"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Tools
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Look at the awesome tools that we have made for future
                          projects
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/tools/chatbot" title="Chatbot">
                    Use the chatbot to ask questions about specific VPC IQPs
                  </ListItem>

                  <ListItem href="/tools/podcast" title="Podcast">
                    Get a full podcast about any inputted report
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="z-1000 pr-4">
        <ModeToggle />
      </div>
    </header>
  );
}
