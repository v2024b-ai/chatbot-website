import { StaticImageData } from "next/image";

export type TeamCards = {
  title: string;
  term: string;
  description: string;
  member: MemberCards[];
};

export type MemberCards = {
  name: string;
  major: string;
  picture: StaticImageData;
  descrip: string;
};
