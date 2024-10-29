# Add a Model

Please follow these steps to test and add a model to our database!

## 1) Data Collection

Please collect the following information before testing a model in
order for us to add it into our database:

- `Model` - The name of the model. For example, "gemini-1.5-pro"
- `URL` - The front page for the model
- `Input Price` - The price for input per million tokens
- `Output Price` - The price for output per million tokens
- `Privacy URL` - The url for the user agreement for the model
- `Context length` - The contect length/window for the LLM
- `Model Size` - The size of the LLM in billions of paramaters
- `Max Input Length` - the max number of input tokens per request
- `Max Output Length` - The max number of output tokens per request
- `File Input` - Can the model accept file input?
- `File Output` - Can the model procude a file as output?
- `Features` - A comma delimited string representing the features that this model
has. Example: "audio output,text to speech"

Optionally, you can also collect the following metrics:

- `Perplexity` - Perplexity score. This requires you to test the model yourself
- `Output Response Time` - We will provide you with a text file and prompt.
This represents (in seconds) how long it took for a response

## 2) Testing The Model

We will be testing the output of the LLM based on a standered context file
and prompt. We will provide both of those to you.

Click [here](https://chatvpc.vercel.app/ai/testing/model-test.txt)
to download the text file that we will use for context.

Then, copy the following prompt and query the model based on that:

```
add query here
```

Then, record the output of the model for later.
