import { type UploadFileData } from "@/types/ai/gemini";
import { useState } from "react";

export function useRecommendation() {
  const [rec, setRec] = useState<UploadFileData>();
  return { rec, setRec };
}
