"use client"

import { CenterInScreen } from "@/components/center-in-screen"
import ChatBotCSVBase from "@/components/chatbot/chatbot-csv-base"

export default function CsvAnalyzerPage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <CenterInScreen>
        <ChatBotCSVBase />
      </CenterInScreen>
    </main>
  )
}
