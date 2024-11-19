"use client"
import { api } from "@/trpc/react";

export default function page() {
  const { data: papers } = api.embedding.test.useQuery({ hi: "sdosdso" })

  console.log(papers)

  return (
    <div>
      hi mom
    </div>
  )
}
