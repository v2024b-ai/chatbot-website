"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useToast } from "@/hooks/use-toast";

export default function UploadButton() {
  const [file, setFile] = useState<File | null>();
  const [hasDownload, setHasDownload] = useState(false);
  const [play, setPlay] = useState(false);
  const [blobURL, setBlobURL] = useState("");
  const [transcript, setTranscript] = useState("");
  const { toast } = useToast();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  async function downloadFile() {
    const url = "https://podcast-gen.pages.dev/gen-pod/";
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      setHasDownload(true);
      try {
        const response = await axios.post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob",
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const audioBlob = response.data; // Adjust MIME type as needed
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const audioUrl = URL.createObjectURL(audioBlob);

        const a = document.createElement("a");
        a.href = audioUrl;
        a.download = file.name.replace(".pdf", "") + ".mp3";
        setBlobURL(audioUrl);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast({
          title: "Podcast has been downloaded",
          variant: "destructive",
        });

        // Get the transcript
        const urlTrans = "https://podcast-gen.pages.dev/get-trans/";
        const trans = await axios.get(urlTrans);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setTranscript(trans.data);
        // Change the states
        setFile(null);
        setHasDownload(false);
        setPlay(true);
        return;
      } catch (e) {
        console.error(e);
        return;
      }
    }
  }

  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      {!hasDownload && (
        <Input
          type="file"
          accept=".pdf"
          className="max-w-80 cursor-pointer border-2 bg-input bg-contain"
          onChange={handleFileChange}
        ></Input>
      )}
      {file && !hasDownload && (
        <Button
          type="button"
          className="w-50 cursor-pointer self-center"
          onClick={downloadFile}
        >
          Upload
        </Button>
      )}
      {hasDownload && (
        <div className="flex flex-col">
          <LoadingSpinner big />
          <p className="space-y-6">Podcast is Generating...</p>
        </div>
      )}
      {play && (
        <div className="flex h-1/2 w-full flex-row justify-evenly p-4">
          <audio controls src={blobURL} datatype="audio/mpeg" />
          <div className="w-100 whit h-full w-3/4 overflow-x-auto overflow-y-scroll whitespace-pre-wrap break-words border-2 p-4">
            {transcript}
          </div>
        </div>
      )}
    </main>
  );
}
