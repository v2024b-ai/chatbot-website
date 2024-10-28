import { Separator } from "@/components/ui/separator";

export default function AddModelPage() {

  return (
    <main className="space-y-6 p-10 pb-16">
      <div className="flex justify-between space-y-0.5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Add A Model</h2>
          <p className="text-muted-foreground">
            Please follow these steps to add a model into our evaluation database!
          </p>
        </div>
      </div>
      <Separator className="my-6" />
    </main>
  )
}
