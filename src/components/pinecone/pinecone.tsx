import * as React from "react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Card } from "@/components/ui/card";
import { pc, index } from "../../server/api/routers/pinecone";

const Pinecone = () => {
  const [input, setInput] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    try {
      const query = [input];

      const embedding = await pc.inference.embed(model, query, {
        inputType: "query",
      });
    } catch {}
  };

  return (
    <>
      <Card>
        <Input onInput={handleInputChange} value={input} />
        <button onClick={handleSubmit}>Submit</button>
      </Card>
    </>
  );
};

export default Pinecone;
