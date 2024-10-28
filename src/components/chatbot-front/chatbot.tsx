/**
 * v0 by Vercel.
 * @see https://v0.dev/t/rGHL6nRSWtS
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Chatbot() {
  return (
    <div className="grid w-full divide-y divide-gray-200 rounded-lg border border-gray-200 dark:divide-gray-800 dark:border-gray-800">
      <div className="flex flex-1 flex-col p-4">
        <div className="space-y-1">
          <h3 className="text-lg font-medium leading-none">Customer Support</h3>
          <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
            Typing...
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col items-end space-y-2">
            <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <div className="text-sm">Hi there! How can I help you today?</div>
            </div>
            <div className="text-right text-xs text-gray-500 dark:text-gray-400">
              2 minutes ago
            </div>
          </div>
          <div className="flex flex-col items-start space-y-2">
            <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <div className="text-sm">
                I&apos;m having trouble with my order. Can you help me?
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              1 minute ago
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <form className="flex space-x-4">
          <div className="flex-1">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Enter your message"
              className="min-h-[100px]"
            />
          </div>
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
}
