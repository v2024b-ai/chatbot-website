import { AddModelForm } from "@/components/eval/add-model-form"

export default function AddModelPage() {

  const prompt = "some prompt"

  return (
    <div className="max-w-7xl mx-auto p-6  rounded-lg shadow-md space-y-6 ">
      <h1 className="text-3xl font-bold ">Add a Model</h1>
      <p>Please follow these steps to test and add a model to our database!</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold ">1) Data Collection</h2>
        <p>
          Please collect the following information and save them for later:
        </p>

        <ul className="list-disc list-inside space-y-2 ">
          <li><span className="font-semibold">Model</span> - The name of the model. For example, "gemini-1.5-pro"</li>
          <li><span className="font-semibold">URL</span> - The front page for the model</li>
          <li><span className="font-semibold">Input Price</span> - The price for input per million tokens</li>
          <li><span className="font-semibold">Output Price</span> - The price for output per million tokens</li>
          <li><span className="font-semibold">Privacy URL</span> - The URL for the user agreement for the model</li>
          <li><span className="font-semibold">Context Length</span> - The context length/window for the LLM</li>
          <li><span className="font-semibold">Model Size</span> - The size of the LLM in billions of parameters</li>
          <li><span className="font-semibold">Max Input Length</span> - The max number of input tokens per request</li>
          <li><span className="font-semibold">Max Output Length</span> - The max number of output tokens per request</li>
          <li><span className="font-semibold">File Input</span> - Can the model accept file input?</li>
          <li><span className="font-semibold">File Output</span> - Can the model produce a file as output?</li>
          <li><span className="font-semibold">Features</span> - A comma-delimited string representing the features of the model, e.g., "audio output, text to speech"</li>
        </ul>

        <p className="mt-4">
          Optionally, you can also collect the following metrics:
        </p>

        <ul className="list-disc list-inside space-y-2 ">
          <li><span className="font-semibold">Perplexity</span> - Perplexity score. This requires you to test the model yourself</li>
          <li><span className="font-semibold">Output Response Time</span> - We will provide you with a text file and prompt. This is the response time in seconds</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold ">2) Testing The Model</h2>
        <p>
          We will be testing the output of the LLM based on a standard context file
          and prompt, which we will provide.
        </p>
        <p>
          Click <a href="/ai/testing/model-test.txt" download="context-file.txt" className="text-blue-500 underline">here</a> to download the text file that we will use for context.
        </p>

        <p>Then, copy the following prompt and query the model based on that:</p>

        <pre className="bg-gray-100 p-4 rounded-md border text-gray-700">
          {prompt}
        </pre>

        <p>Then, record the output of the model.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">That&apos;s it! You&apos;re ready to submit a model!</h2>
        <AddModelForm />
      </section>
    </div>
  )
}
