import type { TeamCards, MemberCards } from "@/types/team-cards";
import Lucas from "@/data/teams/B24pioneer/LucasLamenha.jpeg";
import Mina from "@/data/teams/B24pioneer/MinaBoktor.jpeg";
import James from "@/data/teams/B24pioneer/JamesWalden.jpeg";
import Krishna from "@/data/teams/B24pioneer/KrishnaGarg.jpeg";

export const B24Members: Array<MemberCards> = [
  {
    name: "Mina Boktor",
    major: "Computer Science '26",
    picture: Mina,
  },
  {
    name: "Krishna Garg",
    major: "Computer Science '26",
    picture: Krishna,
  },
  {
    name: "Lucas Lamenha",
    major: "Computer Science '25",
    picture: Lucas,
  },
  {
    name: "James Walden",
    major: "Computer Science '26",
    picture: James,
  },
];

export const B24Pioneers: TeamCards = {
  title: "ChatVPC",
  term: "B2024",
  description:
    "This was the first team to work on the ChatVPC project! They were the best.",
  member: B24Members,
};
