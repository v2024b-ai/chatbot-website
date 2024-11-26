import type { ModelCards } from "@/types/model-cards";

export const Models: Array<ModelCards> = [
  {
    title: "Chatbot",
    shortDesc: "Use the chatbot to ask questions about specific VPC IQPs",
    longDesc: "Use the chatbot to ask questions about specific VPC IQPs",
    link: "/tools/chatbot",
  },
  // {
  //   title: "Data Analyzer",
  //   shortDesc: "Use this chatbot to analyze CSV files",
  //   longDesc:
  //     "Upload a report and get back a complete podcast format" +
  //     " conversation about the topics of the report",
  //   link: "/tools/csv-analyzer",
  // },
  // {
  //   title: "Podcast",
  //   shortDesc: "Get a full podcast about any inputted report",
  //   longDesc:
  //     "Import a report file and generate an AI podcast on that" +
  //     " specific report.",
  //   link: "/tools/podcast",
  // },
  {
    title: "CSV Query Tool Chatbot",
    shortDesc: "Query our CSVs and ask questions to our chatbot",
    longDesc:
      "Ask CSV specific questions to our live-querying chatbot" +
      " and get real-data answers from select data sets.",
    link: "/tools/csv-query",
  },
  {
    title: "Report Chatbot",
    shortDesc:
      "Use the chatbot to ask questions after selecting a specific VPC IQP reports",
    longDesc:
      "Use the chatbot to ask questions after selecting a specific VPC IQP reports",
    link: "/tools/chatbotV2",
  },
]
