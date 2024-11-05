import { CenterInScreen } from "@/components/center-in-screen";
import UploadButton from "@/components/upload-file/upload";

export default function PodcastPage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <CenterInScreen>
        <UploadButton />
      </CenterInScreen>
    </main>
  );
}
