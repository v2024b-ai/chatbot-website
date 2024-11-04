import { CenterInScreen } from "@/components/center-in-screen";
import ChatSupport from "@/components/chatbot/chatbot";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ChatbotPage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <CenterInScreen>
        <SidebarProvider className="flex-grow bg-muted/40">
          <ChatSupport />
        </SidebarProvider>
      </CenterInScreen>
    </main>
  );
}
