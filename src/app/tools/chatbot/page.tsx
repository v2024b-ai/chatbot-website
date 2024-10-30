import { CenterInScreen } from "@/components/center-in-screen";
import ChatSupport from "@/components/chatbot/chatbot";

export default function ChatbotPage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <CenterInScreen>
        <ChatSupport />
      </CenterInScreen>
    </main>
  );
}
