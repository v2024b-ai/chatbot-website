import { ModelCards } from "@/types/model-cards";

export const Models: Array<ModelCards> = [
    { title: "Chatbot",
      shortDesc: "Use the chatbot to ask questions about specific VPC IQPs",
      longDesc: "Use the chatbot to ask questions about specific VPC IQPs",
      link: "/tools/chatbot"
    },
    { title: "Data Analyzer",
        shortDesc: "Use this chatbot to analyze CSV files",
        longDesc: "Upload a report and get back a complete podcast format" +
                 " conversation about the topics of the report",
        link: "/tools/csv-analyzer"
      },
      { title: "Podcast",
        shortDesc: "Get a full podcast about any inputted report",
        longDesc: "Import a report file and generate an AI podcast on that" +
                  " specific report.",
        link: "/tools/podcast"
      }
];