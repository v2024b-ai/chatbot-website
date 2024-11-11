"use client";
import { CenterInScreen } from "@/components/center-in-screen";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { wait } from "next/dist/lib/wait";
import axios from "axios";

export default function UploadButton() {
  const [file, setFile] = useState<File | null>(null);
  const [loadingDialog, setLoadingDialog] = useState(false);

  interface retData {
    dialogue: string;
    audio: File;
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    // console.log(file?.name + file?.type);
    setLoadingDialog(true);
    console.log("Uploading file... ");
    await wait(5);
    /*Send backend request here*/
    const retData: retData = await axios.post(
      "http://127.0.0.1:8000/gen-pod/",
      file,
      {
        headers: {
          "Content-Type": file?.type,
        },
      },
    );

    setLoadingDialog(false);
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
            Upload &#34; {file.name} &#34;
          </Button>
        )}
      </CenterInScreen>
    </main>
  );
}
