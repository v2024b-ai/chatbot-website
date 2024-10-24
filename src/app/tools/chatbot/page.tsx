import { HydrateClient } from "@/trpc/server";

export default async function ChatbotPage(){
    return (
        <HydrateClient>
            <main className='flex min-h-screen flex-col items-center justify-center bg-primary bg-gradient-to-b from-primary to-secondary text-white'>
                <p> Non c'è ancora niente!</p>
            </main>
        </HydrateClient>
        
    )
}