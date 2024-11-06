import { CenterInScreen } from "@/components/center-in-screen";
import ChatBotWithRec from "@/components/chatbot/chatbot-with-recommendations";

export default function ChatbotPage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <CenterInScreen>
        <ChatBotWithRec />
      </CenterInScreen>
    </main>
  );
}
