"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CenterInScreen } from "@/components/center-in-screen";
import Image from "next/image";
import notebookLM from "public/notebook-lm.png";
import gemini from "public/gemini.png";
import chatGPT from "public/chatgpt.png";
import openWebUI from "public/openwebui.png";
import Link from "next/link";
import type { cardDetails } from "@/types/cardDetails";

const arr: cardDetails[] = [
  {
    name: "NotebookLM",
    description:
      "Engineered for student use NotebookLM is capable of generating podcasts, FAQs, summaries, and chatbot about inputted PDFs.",
    img: { notebookLM }.notebookLM,
    link: "https://notebooklm.google.com/",
  },
  {
    name: "ChatGPT",
    description:
      "ChatGPT is useful for all purposes. It is capable of doing anything that a VPC student may need. ",
    img: { chatGPT }.chatGPT,
    link: "https://chatgpt.com/",
  },
  {
    name: "Gemini",
    description:
      "Google Gemini is great at finding resources and directing you to useful information. It is not as capable as ChatGPT in regards to summarization and production, but it is still a great resource.",
    img: { gemini }.gemini,
    link: "https://gemini.google.com/app",
  },
  {
    name: "Open Web UI",
    description:
      "While you have to download this to your local machine and it does take up a lot of computing power, this is the strongest and most accurate tool in regards to summarization and producable content.",
    img: { openWebUI }.openWebUI,
    link: "https://docs.openwebui.com/",
  },
];
export default function ReccPage() {
  return (
    <main className="p-10 pb-16">
      <div className="flex flex-col">
        <div className="flex flex-wrap justify-center text-2xl">
          <h1>Recommendations</h1>
          <p>
            These are the best tools that we were able to find that could
            potentially be useful to VPC students in the future
          </p>
        </div>
        <br />
        <Card className={"flex w-full justify-evenly p-3"}>
          {arr.map((recc) => (
            <HoverCard key={recc.name}>
              <HoverCardTrigger asChild>
                <Link
                  href={recc.link}
                  className="text-white outline-primary duration-100 hover:outline"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>{recc.name}</CardTitle>
                      <HoverCardContent>{recc.description}</HoverCardContent>
                    </CardHeader>
                    <CardContent className="max-w-full">
                      <div className="relative h-[30vh] w-[15vw]">
                        <Image
                          src={recc.img}
                          alt={recc.name}
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </HoverCardTrigger>
            </HoverCard>
          ))}
        </Card>
      </div>

    </main>
  );
}
