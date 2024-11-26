import { HydrateClient } from "@/trpc/server";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {

  return (
    <HydrateClient>
      <main className="flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Welcome to the ChatVPC App
          </h1>
          <div className="flex flex-wrap gap-2">
            <Link href={"/eval"}>
              <Card className="aspect-square w-64 transition-shadow duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Evaluations</CardTitle>
                  <CardDescription>Look at our evaluations of select models</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href={"/tools"}>
              <Card className="aspect-square w-64 transition-shadow duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Tools</CardTitle>
                  <CardDescription>Take a peek at the sample tools that we&apos;ve developed</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href={"/recommendations"}>
              <Card className="aspect-square w-64 transition-shadow duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                  <CardDescription>Check out some of the AI tools that we recommend you use!</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href={"/about"}>
              <Card className="aspect-square w-64 transition-shadow duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>About Us</CardTitle>
                  <CardDescription>Get to know a bit more about the teams that have worked on this project in the past!</CardDescription>
                </CardHeader>
              </Card>
            </Link>

          </div>
          <div className="w-[70vw]">
            <Card>
              <CardHeader>
                <CardTitle>
                  What is this project?
                </CardTitle>
                <CardContent>
                  This project was developed to help WPI students to find AI tools that might help them research, find, analyze, synthesize, and understand previous Venice Project Center IQP reports better! This project was developed as its own IQP for this reason. If you want to know more about the people who have worked on this before, visit our About Page.
                </CardContent>
              </CardHeader>
            </Card>
          </div>

        </div>
      </main>
    </HydrateClient>
  );
}
