import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Entry ids keep the language folder, e.g. "es/cases/my-case".
const keepPath = ({ entry }: { entry: string }) => entry.replace(/\.mdx?$/, '');
const base = './src/content';

const cases = defineCollection({
  loader: glob({ pattern: '*/cases/*.md', base, generateId: keepPath }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    summary: z.string(),
    role: z.string().optional(),
    period: z.string().optional(),
    stack: z.array(z.string()).default([]),
    url: z.url().optional(),
    order: z.number().default(100),
    // true = details still pending; the card shows a "coming soon" note.
    placeholder: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*/projects/*.md', base, generateId: keepPath }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(['in-progress', 'available', 'archived']),
    tags: z.array(z.string()).default([]),
    url: z.url().optional(),
    repo: z.url().optional(),
    order: z.number().default(100),
  }),
});

const now = defineCollection({
  loader: glob({ pattern: '*/now.md', base, generateId: keepPath }),
  schema: z.object({
    updated: z.coerce.date(),
  }),
});

export const collections = { cases, projects, now };
