"use client"
import { Button } from "@/components/ui/button"

export type RecommendedDocumentButtonProps = {
  url: string
  title: string
}

export const RecommendedDocumentButton = ({ url, title }: RecommendedDocumentButtonProps) => {
  function onSubmit() {
    console.log(url);
  }

  return (
    <Button onClick={onSubmit} variant={"secondary"} className="flex flex-row">
      <h1 className="text-2xl">{title}</h1>
      {/* <p className="text-gray-500">{fileType}</p> */}
    </Button>
  )
}
