import { CenterInScreen } from "@/components/center-in-screen";
import ChatbotWithPDFChunking from "@/components/chatbot/chatbot-pdf-chunks";

export default function page() {
  return <main className="flex flex-col items-center justify-center">
    <CenterInScreen>
      <ChatbotWithPDFChunking />
    </CenterInScreen>
  </main>
}
