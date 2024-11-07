import { z } from "zod";

export const sendURL = z.object({
  url: z.string().url("Please Input URL of format - https://..."),
});

export type sendURLType = z.infer<typeof sendURL>;
