"use client";
import { api } from "@/trpc/react";
import { type UploadFileData } from "@/types/ai/gemini";
import { useEffect, useState } from "react";

export function useRecommendation() {
  const [rec, setRec] = useState<UploadFileData[]>([]);
  const [input, setInput] = useState<string>("");
  const pinecone = api.pinecone.getReportTitlesAndUrls.useMutation({
    onSuccess: (data) => {
      setRec(
        data.map(({ title, url }) => ({
          displayName: title,
          fileURL: url,
          mimeType: "application/pdf",
        })),
      );
    },
  });

  useEffect(() => {
    if (input) pinecone.mutate({ input });
  }, [input, pinecone]);

  return { rec, setInput };
}
