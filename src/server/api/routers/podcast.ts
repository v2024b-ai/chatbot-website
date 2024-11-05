import axios from "axios";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { sendURL } from "@/types/podcast/podcast-types";

interface retData {
  dialogue: string;
  audio: File;
}

export const modelRoute = createTRPCRouter({
  getPod: publicProcedure.input(sendURL).mutation(async ({ input, ctx }) => {
    const podcast: retData = await getPod(input.url);
    //   download the file that you get and return the string
    //   Because its a pain to transfer files like this

    //   First download the file to a common directory
  }),
});

// This is just a template function
const getPod = async (data: string): Promise<retData> => {
  // We'll fill this in after. Make sure the /.../ is the right one so you are calling the correct function
  const url = "";
  try {
    const pod = await axios.post<retData>(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // This will return a mp3 file and also a big ass string which will be the dialogue
    return pod.data;
  } catch (error) {
    console.error("Error getting podcast and transcript", error);
    throw error;
  }
};
