import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Teams } from "@/data/teams/teams-array"; //if you want to add your team to the page, read this file and add the team to the array (try to follow the same style)

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight">
          These are the teams that have worked on this project:
        </h1>

        {Teams.map((team, teamIndex) => (
          <div key={teamIndex}>
            <div className="mb-5 flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold tracking-tight">
                {team.title}
              </h1>
              <h2 className="text-xl font-bold tracking-tight">{team.term}</h2>
              <p className="text-lg">{team.description}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              {team.member.map((member, memberIndex) => (
                <div
                  key={memberIndex}
                  className="flex flex-wrap justify-center gap-4"
                >
                  <Card className="h-auto w-auto">
                    <CardHeader>
                      <CardTitle>{member.name}</CardTitle>
                      <CardDescription> {member.major}</CardDescription>
                    </CardHeader>
                    <CardContent className="max-w-full">
                      <div className="relative h-[30vh] w-[15vw]">
                        <Image
                          src={member.picture}
                          alt={`${member.name}'s picture`}
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
