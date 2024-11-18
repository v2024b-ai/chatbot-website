"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardImage,
} from "@/components/ui/card";

import { CenterInScreen } from "@/components/center-in-screen";
import path from "path";

type cardDetails = {
  name: string;
  description: string;
  img: string;
};
const arr: cardDetails[] = [
  {
    name: "NotebookLM",
    description: "This is really good",
    img: "",
  },
  {
    name: "ChatGPT",
    description: "This is also really good",
    img: "public/notebook-lm.png",
  },
  {
    name: "Gemini",
    description: "This is also really good",
    img: "public/notebook-lm.png",
  },
  {
    name: "Github",
    description: "This is also really good",
    img: "public/notebook-lm.png",
  },
];
export default function ReccPage() {
  return (
    <main className="space-y-6 p-10 pb-16">
      <CenterInScreen>
        {arr.map((recc) => (
          <Card key={recc.name}>
            <CardHeader>
              <CardImage></CardImage>
              <CardTitle>{recc.name}</CardTitle>
              <CardDescription>{recc.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </CenterInScreen>
    </main>
  );
}
