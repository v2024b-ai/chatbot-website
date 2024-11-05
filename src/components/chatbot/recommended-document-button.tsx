"use client"
import { Button } from "@/components/ui/button"
import { type UploadFileData } from "@/types/ai/gemini"

export type RecommendedDocumentButtonProps = {
  file: UploadFileData,
  onClick: (file: UploadFileData) => void;
}

export const RecommendedDocumentButton = ({ file, onClick }: RecommendedDocumentButtonProps) => {


  return (
    <Button onClick={() => onClick(file)} variant={"secondary"} className="flex flex-row">
      <h1 className="text-xl">{file.displayName}</h1>
      <p className="text-gray-500">{file.mimeType}</p>
    </Button>
  )
}
