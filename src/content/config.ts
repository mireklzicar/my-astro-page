import { defineCollection, z } from "astro:content"

const publications = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    thumbnail: z.string().optional(),
    demoUrl: z.string().optional(),
    publicationUrl: z.string().optional(),
    arxivUrl: z.string().optional(),
    zenodoUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    xUrl: z.string().optional(),
    originalUrl: z.string().optional(),
    readMoreUrl: z.string().optional(),
    pdfUrl: z.string().optional(),
  }),
})

const talks = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    thumbnail: z.string().optional(),
    youtubeUrl: z.string().optional(),
    xUrl: z.string().optional(),
    originalUrl: z.string().optional(),
    readMoreUrl: z.string().optional()
  }),
})


const work = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
    thumbnail: z.string().optional(),
  }),
})

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    category: z.enum(["tech", "personal"]).default("tech"),
    draft: z.boolean().optional(),
    thumbnail: z.string().optional(),
    originalUrl: z.string().optional(),
    readMoreUrl: z.string().optional(),
    pdfUrl: z.string().optional(),
    toc: z.boolean().optional().default(false)
  }),
})

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    readMoreUrl: z.string().optional(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    thumbnail: z.string().optional(),
    originalUrl: z.string().optional(),
    pdfUrl: z.string().optional()
  }),
})

const legal = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
})

export const collections = { publications, work, blog, projects, legal, talks }
