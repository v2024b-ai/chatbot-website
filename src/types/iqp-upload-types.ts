import { z } from "zod";

export const uploadInput = z.object({
  title: z.string(),
  description: z.string(),
  url: z.string().startsWith("https://digital.wpi.edu", {
    message: "Must be an applicable url starting with https://digital.wpi.edu",
  }),
});

export const findURLS = z.object({
  titles: z.string().array(),
});

export type UploadInput = z.infer<typeof uploadInput>;

export type FindURLS = z.infer<typeof findURLS>;
