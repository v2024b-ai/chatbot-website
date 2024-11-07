"use client";
import { CenterInScreen } from "@/components/center-in-screen";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function UploadButton() {
  const [file, setFile] = useState<File | null>(null);
  const [loadingDialog, setLoadingDialog] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      // dw about this hehe I'll figure it out later
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file && file.type == "pdf") {
      setLoadingDialog(true);
      console.log("Uploading file...");

      const formData = new FormData();
      formData.append("file", file);

      setLoadingDialog(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <CenterInScreen>
        <Input
          type="file"
          accept=".pdf"
          className="max-w-80 cursor-pointer"
          onChange={handleFileChange}
        ></Input>
        {file && (
          <Button
            type="button"
            className="w-50 cursor-pointer self-center"
            onClick={handleUpload}
          >
            Upload &#34; {file.name.toString()} &#34;
          </Button>
        )}
      </CenterInScreen>
    </main>
  );
}
