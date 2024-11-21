import type { ModelCards } from "@/types/model-cards";

export const Models: Array<ModelCards> = [
  {
    title: "Chatbot",
    shortDesc: "Use the chatbot to ask questions about any of the VPC IQP's",
    longDesc: "Use the chatbot to ask questions about any of the VPC IQP's",
    link: "/tools/chatbotV2",
  },
  {
    title: "Data Analyzer",
    shortDesc: "Use this chatbot to analyze CSV files",
    longDesc:
      "Upload a report and get back a complete podcast format" +
      " conversation about the topics of the report",
    link: "/tools/csv-analyzer",
  },
  {
    title: "Podcast",
    shortDesc: "Get a full podcast about any inputted report",
    longDesc:
      "Import a report file and generate an AI podcast on that" +
      " specific report.",
    link: "/tools/podcast",
  },
  {
    title: "Report Chatbot",
    shortDesc:
      "Use the chatbot to ask questions after selecting a specific VPC IQP reports",
    longDesc:
      "Use the chatbot to ask questions after selecting a specific VPC IQP reports",
    link: "/tools/chatbot",
  },
];
