import { z } from "zod";

export const OPTIONS = [
  "React",
  "Vue",
  "Angular",
  "Svelte",
  "Next.js",
  "Vite",
];

export const formSchema = z.object({
  framework: z.string()
    .trim()
    .refine((val) => val === "" || OPTIONS.includes(val), {
      message: "Please select from dropdown list",
    }),
});
