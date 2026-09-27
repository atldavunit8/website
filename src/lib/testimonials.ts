import { z } from 'astro/zod';
import records from '../content/testimonials.json';

const requiredText = z.string().trim().min(1);
const testimonials = z.array(z.object({
  id: requiredText,
  title: requiredText,
  quote: requiredText,
  attribution: requiredText,
  publishStatus: z.enum(['draft', 'published']).default('draft'),
  approved: z.boolean().default(false),
  sample: z.boolean().default(false),
  displayOrder: z.number().int().nonnegative().default(0),
})).parse(records);

export const publishedTestimonials = testimonials
  .filter((item) => item.publishStatus === 'published' && item.approved && !item.sample)
  .sort((a, b) => a.displayOrder - b.displayOrder || a.id.localeCompare(b.id));
