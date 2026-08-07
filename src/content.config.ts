import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const cursos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/cursos" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      niche: z.enum(["tecnologia", "saude", "bem-estar"]),
      description: z.string(),
      presellUrl: z.string().url(),
      image: image().optional(),
      imageAlt: z.string().optional(),
    }),
});

export const collections = { cursos };
