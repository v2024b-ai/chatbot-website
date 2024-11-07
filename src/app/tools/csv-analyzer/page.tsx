"use client"

import { CenterInScreen } from "@/components/center-in-screen"
import ChatBotCSV from "@/components/chatbot/chatbot-csv-upload"

export default function CsvAnalyzerPage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <CenterInScreen>
        <ChatBotCSV />
      </CenterInScreen>
    </main>
  )
}
