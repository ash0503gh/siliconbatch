import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const programs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/programs' }),
  schema: z.object({
    ticker: z.string(),
    name: z.string(),
    organizer: z.string(),
    tagline: z.string(),
    logo: z.string(),
    bannerImage: z.string().optional(),
    website: z.string().url(),
    applyUrl: z.string().url(),
    
    // Deadlines & Timeline
    closingDate: z.string(), // ISO format YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ
    isRolling: z.boolean().default(false),
    durationWeeks: z.number(),
    cohortStart: z.string(),
    
    // Geography
    location: z.object({
      city: z.string(),
      state: z.string().optional(),
      country: z.string(),
      inPerson: z.boolean(),
      residencyDetails: z.string(),
    }),
    
    // Focus Areas
    sectors: z.array(z.enum([
      'Physical AI',
      'Robotics',
      'Advanced Electronics',
      'Silicon & Semiconductors',
      'Frontier AI',
      'Sensors & Actuators',
      'Embedded Systems'
    ])),
    stage: z.string(),
    
    // Financial Terms
    terms: z.object({
      checkSizeUsd: z.number(),
      checkDisplay: z.string(),
      instrument: z.enum(['SAFE', 'Priced Equity', 'Convertible Note', 'Non-dilutive Grant']),
      equityPercent: z.number().nullable(),
      valuationCapDisplay: z.string(),
      stipend: z.string().optional(),
      ipOwnership: z.string(),
    }),
    
    // Hardware & Lab Infrastructure
    hardwareFacilities: z.array(z.string()),
    perks: z.array(z.string()),
    notableAlumni: z.array(z.string()).default([]),
    applicationTips: z.array(z.string()).default([]),
    badge: z.string().optional(),
  }),
});

export const collections = { programs };
