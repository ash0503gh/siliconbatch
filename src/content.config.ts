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

const companies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/companies' }),
  schema: z.object({
    ticker: z.string(),
    name: z.string(),
    batch: z.string(), // e.g. "W24", "S24", "W25", "S23"
    tagline: z.string(),
    logo: z.string(),
    bannerImage: z.string().optional(),
    website: z.string().url(),
    careersUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    stage: z.string(), // e.g. "Seed", "Series A", "Series B"
    totalRaised: z.string(), // e.g. "$120M", "$5.3M", "$25M"
    sectors: z.array(z.string()), // e.g. ["AI", "Hardware"], ["Robotics", "Physical AI"], ["DevTools"], ["B2B SaaS"]
    location: z.object({
      city: z.string(),
      state: z.string().optional(),
      country: z.string(),
    }),
    founders: z.array(z.string()),
    hiring: z.boolean().default(false),
    openRolesCount: z.number().default(0),
    techStack: z.array(z.string()).default([]),
    badge: z.string().optional(),
  }),
});

const innovations = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/innovations' }),
  schema: z.object({
    ticker: z.string(),
    title: z.string(),
    tagline: z.string(),
    domain: z.enum([
      'Physical AI & Robotics',
      'Hardware & Frontier Silicon',
      'Autonomous Systems & Aerospace',
      'AI Foundation Models',
    ]),
    organization: z.string(),
    releaseDate: z.string(),
    impactMetric: z.string(),
    status: z.enum([
      'Live Production',
      'Open Weights',
      'Commercial Pilot',
      'Research Breakthrough',
    ]),
    badge: z.string().optional(),
    specs: z.record(z.string()),
    tags: z.array(z.string()),
    links: z.object({
      website: z.string().url().optional(),
      paperUrl: z.string().url().optional(),
      githubUrl: z.string().url().optional(),
      demoUrl: z.string().url().optional(),
    }),
    image: z.string().optional(),
    bannerImage: z.string().optional(),
  }),
});

export const collections = { programs, companies, innovations };
