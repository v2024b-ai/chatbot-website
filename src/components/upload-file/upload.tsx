"use client";
import { CenterInScreen } from "@/components/center-in-screen";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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

  async function downloadFile() {
    const url = "http://127.0.0.1:8000/gen-pod/";
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "stream",
      });

      const blob = new Blob([response?.data], { type: "mp3" });

      const url_two = URL.createObjectURL(blob);

      // Create a temporary link to trigger the download
      const a = document.createElement("a");
      a.href = url_two;
      a.download = "something.mp3";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url); // Clean up the URL object
    }
  }

  const handleUpload = async () => {
    // console.log(file?.name + file?.type);
    setLoadingDialog(true);
    console.log("Uploading file... ");
    await downloadFile();
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
