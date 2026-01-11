import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const post = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './markdown/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    originalURI: z.string().url().nullable().optional(),
  }),
});

const talk = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './markdown/talks' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    slidesURI: z.string().nullable().optional(),
    videoURI: z.string().url().nullable().optional(),
    eventURI: z.string().url().nullable().optional(),
    slideContentURI: z.string().nullable().optional(),
  }),
});

export const collections = { post, talk };
