import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Gemini } from "@/lib/gemini";
import {
  propmptWithFilesSchema,
  uploadFileData,
  promptSchema,
  promptWithDBSchema
} from "@/types/ai/gemini";

export const chatRouter = createTRPCRouter({
  prompt: publicProcedure
    .input(propmptWithFilesSchema)
    .mutation(async ({ input }) => {
      const gemini = new Gemini();

      const fileData = await gemini.upload([input.files]);
      const geminiResponse = await gemini.promptWithFile(input.data, fileData);

      return geminiResponse;
    }),

  db: publicProcedure
    .input(promptWithDBSchema)
    .mutation(async ({ input }) => {
    const gemini = new Gemini();

    const csvSchema = "\n\nmodel fountainsCSV {\n  ck_id                               String @id\n  lat                                 Float\n  lng                                 Float\n  additional_notes                    String?\n  base_area                           Float?\n  base_perimeter                      Float?\n  base_shape                          String\n  birthID                             String\n  bolted_to_ground                    Boolean\n  condition_notes                     String?\n  depth                               Float?\n  faucet_design                       String?\n  faucet_height_cm                    Float?\n  faucet_length_cm                    Float?\n  flow_rate                           Float?\n  format                              String?\n  height                              Float?\n  height_cm                           Float?\n  high_traffic_area                   Boolean?\n  material                            String\n  number_of_drains                    Int?\n  old_code                            String?\n  original_paint_remaining_pct        Float?\n  owner                               String\n  parish                              String?\n  raised_drain                        Boolean?\n  risk_factor_algae_pct               Float?\n  risk_factor_graffiti_pct            Float?\n  risk_factor_grime                   String\n  risk_factor_missing_pieces          String\n  risk_factor_overall_damage_pct      Float?\n  risk_factor_rust_percent            Float?\n  risk_factor_surface_damage_percent  Float?\n  running                             Boolean?\n  service_panel                       Boolean\n  sestiere_or_island                  String\n  street                              String\n  street_address                      String\n  subtype                             String?\n  surface_area_sq_cm                  Float?\n  totalDonated                        Float?\n  type                                String?\n  visibility                          String?\n  width                               Float?\n  width_cm                            Float?\n  wiki_friendly_title                 String?\n\n  @@index([ck_id])\n}\n"

      const geminiResponse = await gemini.promptWithDB(input.data, csvSchema);

    return geminiResponse;
  }
  ),

  text: publicProcedure
    .input(z.object({ data: z.array(promptSchema) }))
    .mutation(async ({ input: { data } }) => {
      const gemini = new Gemini();

      // Send the prompt data to Gemini and get the response
      const geminiResponse = await gemini.prompt(data);

      // Return an object with both the response message and recommended files
      return geminiResponse;
    }),

  uploadFile: publicProcedure
    .input(z.object({ data: z.array(uploadFileData) }))
    .mutation(async ({ input: { data } }) => {
      const gemini = new Gemini();
      return gemini.upload(data);
    }),
});
