import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const requiredText = z.string().trim().min(1);
const year = z.number().int().min(2017).max(2100);
const isoDate = z.iso.date();
const webUrl = z.url().refine((value) => /^https?:\/\//i.test(value), 'Use an HTTP or HTTPS URL');
const filePath = z.string().startsWith('/').refine((value) => !value.includes('..'), 'Use an absolute public path');
const media = z.object({
  src: filePath,
  alt: requiredText,
  caption: requiredText.optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});
const common = {
  title: requiredText,
  publishStatus: z.enum(['draft', 'published']).default('draft'),
  sample: z.boolean().default(false),
};

const leadership = defineCollection({
  loader: glob({ base: './src/content/leadership', pattern: '**/*.md' }),
  schema: z.object({
    ...common,
    name: requiredText,
    designation: requiredText,
    shortMessage: requiredText,
    fullMessage: requiredText.optional(),
    portrait: media.optional(),
    signature: media.optional(),
    displayOrder: z.number().int().nonnegative(),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    ...common,
    category: z.enum(['Robotics', 'AI & IoT', 'Sustainability', 'Health & Safety', 'Social Innovation']),
    status: z.enum(['Idea', 'Prototype', 'Testing', 'Completed']).optional(),
    year: year.optional(),
    summary: requiredText,
    problem: requiredText,
    objective: requiredText.optional(),
    workingMechanism: requiredText.optional(),
    teamIntention: requiredText.optional(),
    testimonial: z.object({ quote: requiredText, attribution: requiredText, approved: z.literal(true) }).optional(),
    team: z.array(requiredText).default([]),
    teamPhoto: media.optional(),
    mentor: requiredText.optional(),
    mentorContribution: requiredText.optional(),
    technologies: z.array(requiredText).default([]),
    materials: z.array(requiredText).default([]),
    cover: media.optional(),
    gallery: z.array(media).default([]),
    reportPdf: filePath.optional(),
    videoUrl: webUrl.optional(),
    featured: z.boolean().default(false),
  }),
});

const awards = defineCollection({
  loader: glob({ base: './src/content/awards', pattern: '**/*.md' }),
  schema: z.object({
    ...common,
    organiser: requiredText,
    competition: requiredText.optional(),
    result: requiredText,
    achievementType: z.enum(['Award', 'Selection', 'Participation', 'Grant', 'Recognition']),
    level: z.enum(['School', 'District', 'Regional', 'State', 'National', 'International']).optional(),
    date: isoDate.optional(),
    year: year.optional(),
    academicYear: z.string().regex(/^\d{4}[-/]\d{2,4}$/).optional(),
    projectId: requiredText.optional(),
    students: z.array(requiredText).default([]),
    certificate: filePath.optional(),
    officialResultUrl: webUrl.optional(),
    photos: z.array(media).default([]),
    featured: z.boolean().default(false),
  }),
});

const news = defineCollection({
  loader: glob({ base: './src/content/news', pattern: '**/*.md' }),
  schema: z.object({
    ...common,
    category: z.enum(['Achievement', 'Announcement', 'Scheme', 'Workshop', 'Result', 'External Link']),
    summary: requiredText,
    publishedAt: isoDate.optional(),
    image: media.optional(),
    officialUrl: webUrl.optional(),
    attachment: filePath.optional(),
    featured: z.boolean().default(false),
  }),
});

const competitions = defineCollection({
  loader: glob({ base: './src/content/competitions', pattern: '**/*.md' }),
  schema: z.object({
    ...common,
    organiser: requiredText,
    summary: requiredText,
    eligibility: requiredText.optional(),
    announcedAt: isoDate.optional(),
    deadline: isoDate.optional(),
    officialUrl: webUrl.optional(),
    registrationUrl: webUrl.optional(),
    image: media.optional(),
    attachment: filePath.optional(),
  }),
});

const events = defineCollection({
  loader: glob({ base: './src/content/events', pattern: '**/*.md' }),
  schema: z.object({
    ...common,
    date: isoDate.optional(),
    year: year.optional(),
    location: requiredText.optional(),
    summary: requiredText,
    gallery: z.array(media).default([]),
    reportPdf: filePath.optional(),
    videoUrl: webUrl.optional(),
    participants: z.array(requiredText).default([]),
  }),
});

const publications = defineCollection({
  loader: glob({ base: './src/content/publications', pattern: '**/*.md' }),
  schema: z.object({
    ...common,
    edition: requiredText,
    year: year,
    description: requiredText,
    cover: media.optional(),
    pdf: filePath.optional(),
    articles: z.array(requiredText).default([]),
  }),
});

export const collections = { leadership, projects, awards, news, competitions, events, publications };
