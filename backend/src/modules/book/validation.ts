import { z } from "zod";

export const addBookSchema = z.object({
  Title: z.string(),
  author: z.string(),
  description: z.string(),
  genres: z.string(),
});



export type TaddBookSchema = z.TypeOf<typeof addBookSchema>;
