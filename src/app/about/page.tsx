import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Teams } from "@/data/teams/teams-array"; //if you want to add your team to the page, read this file and add the team to the array (try to follow the same style)

export default function AboutPage() {
  return (
    <main>
      <div>
        <h1>These are the teams that have worked on this project</h1>
      </div>
      <div>
        {Teams.map((team, teamIndex) => (
          <div key={teamIndex}>
            <h1>{team.title}</h1>
            <h2>{team.term}</h2>
            <p>{team.description}</p>
            <div>
              {team.member.map((member, memberIndex) => (
                <div key={memberIndex}>
                  <h3>{member.name}</h3>
                  <h4>{member.major}</h4>
                  <p>{member.descrip}</p>
                  <Image
                    src={member.picture}
                    alt={`${member.name}'s picture`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
