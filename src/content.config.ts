import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    date: z.coerce.date(),
    image: z.string(),
    sourceTitle: z.string().optional(),
    sourceUrl: z.string().optional(),
  }),
});

export const collections = { posts };
